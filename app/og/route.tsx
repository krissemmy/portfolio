import { ImageResponse } from "next/server";
import { profile } from "@/data/profile";

export const runtime = "edge";

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title")?.slice(0, 160) || "Cloud Platform / DevOps Engineer";
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#09090b", color: "#f4f4f5" }}>
      <div style={{ fontSize: 30, color: "#a1a1aa" }}>{profile.name}</div>
      <div style={{ fontSize: title.length > 70 ? 48 : 64, lineHeight: 1.15 }}>{title}</div>
      <div style={{ fontSize: 24, color: "#a1a1aa", borderTop: "1px solid #3f3f46", paddingTop: 24 }}>{new URL(profile.siteUrl).hostname}</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
