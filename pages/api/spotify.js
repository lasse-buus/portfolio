// /pages/api/spotify.js
const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const isDev = process.env.NODE_ENV !== "production";

const notPlaying = (res, reason) => {
	if (reason) console.warn(`[spotify] ${reason}`);
	// In development the reason is returned too, so /api/spotify shows what went wrong
	return res.status(200).json(isDev && reason ? { isPlaying: false, reason } : { isPlaying: false });
};

const getAccessToken = async () => {
	const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ grant_type: "refresh_token", refresh_token }).toString(),
	});
	const data = await response.json().catch(() => ({}));
	return { ok: response.ok, status: response.status, data };
};

export default async function handler(_req, res) {
	if (!client_id || !client_secret || !refresh_token) {
		return notPlaying(res, "Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET or SPOTIFY_REFRESH_TOKEN");
	}

	try {
		const token = await getAccessToken();
		if (!token.ok || !token.data.access_token) {
			const { error, error_description } = token.data || {};
			return notPlaying(
				res,
				`Token request failed (${token.status}): ${error || "unknown"}${error_description ? ` – ${error_description}` : ""}`
			);
		}

		const response = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: { Authorization: `Bearer ${token.data.access_token}` },
		});

		// 204 = nothing playing / private session
		if (response.status === 204) return notPlaying(res);
		if (!response.ok) {
			const body = await response.text().catch(() => "");
			return notPlaying(res, `Now playing request failed (${response.status}) ${body.slice(0, 200)}`);
		}

		const song = await response.json();
		const item = song?.item;

		// Podcasts, ads and local files may come back without a track item
		if (!item) return notPlaying(res, isDev ? `Playing "${song?.currently_playing_type}" without track info` : null);

		res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
		return res.status(200).json({
			isPlaying: Boolean(song.is_playing),
			title: item.name,
			artist: (item.artists || []).map((a) => a.name).join(", "),
			album: item.album?.name || "",
			albumImageUrl: item.album?.images?.[0]?.url || null,
			songUrl: item.external_urls?.spotify || null,
		});
	} catch (err) {
		return notPlaying(res, `Request error: ${err?.message || err}`);
	}
}
