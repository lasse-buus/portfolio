import "../styles/globals.css";
import "photoswipe/dist/photoswipe.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
				<Component {...pageProps} />
			<Analytics />
			<SpeedInsights />
		</ThemeProvider>
	);
}

export default MyApp;
