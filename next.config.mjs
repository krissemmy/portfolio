import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	// `projects.html` (not `projects/index.html`). Wrangler html_handling
	// `auto-trailing-slash` serves these without a trailing slash.
	trailingSlash: false,
	images: {
		unoptimized: true,
	},
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
};

export default withContentlayer(nextConfig);
