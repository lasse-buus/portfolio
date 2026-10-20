import React from "react";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";

const fetcher = (url) => fetch(url).then((r) => r.json());
const PROFILE_URL = "https://open.spotify.com/user/113671250?si=73f1c554e0544785";

/** Hero tile: fills its parent grid cell */
export default function PlayingNow() {
	const { data } = useSWR("/api/spotify", fetcher);
	const playing = Boolean(data?.isPlaying);

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={playing ? data.songUrl : PROFILE_URL}
			className="flex flex-col justify-between h-full p-4 group"
		>
			<span className="flex items-center justify-between">
				<span className="label">{playing ? "Now playing" : "Currently listening"}</span>
				<SiSpotify size={14} className="text-[#1DB954]" />
			</span>
			<span className="flex items-center min-w-0 gap-3 text-left">
				{playing && data?.albumImageUrl ? (
					<img
						src={data.albumImageUrl}
						alt={data.album || ""}
						className="flex-none object-cover w-9 h-9 border rounded border-line"
					/>
				) : null}
				<span className="min-w-0">
					<span className="block text-sm font-bold truncate text-ink group-hover:text-brand-ink">
						{playing ? data.title : "Not listening"}
					</span>
					<span className="block text-xs truncate text-muted">{playing ? data.artist : "Spotify"}</span>
				</span>
			</span>
		</a>
	);
}
