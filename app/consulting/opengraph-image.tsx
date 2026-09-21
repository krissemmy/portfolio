import { ImageResponse } from "next/server";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const alt =
	"Infrastructure for early-stage startups. Lean. Reliable. Recoverable.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: "70px",
				background: "#09090b",
				color: "#f4f4f5",
			}}
		>
			<div style={{ fontSize: 24, color: "#a1a1aa" }}>
				INFRASTRUCTURE FOR EARLY-STAGE STARTUPS
			</div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ fontSize: 70, fontWeight: 700 }}>
					Lean. Reliable. Recoverable.
				</div>
				<div style={{ fontSize: 32, marginTop: 24, color: "#a1a1aa" }}>
					Before you need a full-time infrastructure engineer.
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					borderTop: "1px solid #3f3f46",
					paddingTop: 24,
					fontSize: 24,
				}}
			>
				<span>{profile.name}</span>
				<span>krissemmy.com/consulting</span>
			</div>
		</div>,
		size,
	);
}
