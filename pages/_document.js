import { Html, Head, Main, NextScript } from "next/document";

/*
 * Runs before first paint: on the front page, hide the content so the
 * cursor swarm (components/frontpage/SwarmBuild.js) can build it up.
 * Once per session, never with reduced motion; `/?swarm` forces a replay.
 * If the app never takes over, the content is shown again after 5s.
 */
const swarmGate = `(function(){try{
var d=document.documentElement,force=/[?&]swarm\\b/.test(location.search);
if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(!force&&sessionStorage.getItem("swarm-built"))return;
sessionStorage.setItem("swarm-built","1");
d.setAttribute("data-swarm","pending");
setTimeout(function(){if(d.getAttribute("data-swarm")==="pending")d.removeAttribute("data-swarm")},5000);
}catch(e){}})();`;

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script dangerouslySetInnerHTML={{ __html: swarmGate }} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
