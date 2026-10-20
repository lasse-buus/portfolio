import React from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";

const fetcher = (url) => fetch(url).then((r) => r.json());
const PROFILE_URL = "https://open.spotify.com/user/113671250?si=73f1c554e0544785";

export default function PlayingNowFooter() {
	const { data } = useSWR("/api/spotify", fetcher);
	const playing = Boolean(data?.isPlaying);

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={playing ? data.songUrl : PROFILE_URL}
			className="flex items-center min-w-0 gap-3 group"
		>
			<span className="relative flex items-center justify-center flex-none w-9 h-9 overflow-hidden border rounded-md border-line bg-surface">
				{playing && data?.albumImageUrl ? (
					<img src={data.albumImageUrl} alt={data.album || ""} className="object-cover w-full h-full" />
				) : (
					<SiSpotify size={16} className="text-[#1DB954]" />
				)}
			</span>
			<span className="min-w-0">
				<span className="block label">{playing ? "Now playing" : "Spotify"}</span>
				<span className="block text-sm font-medium truncate text-ink group-hover:text-brand-ink">
					{playing ? `${data.title} — ${data.artist}` : "Not listening right now"}
				</span>
			</span>
		</a>
	);
}
