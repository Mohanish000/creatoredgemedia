import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0C",
        fontSize: 88,
        fontWeight: 700,
        letterSpacing: -3,
      }}
    >
      <span style={{ color: "#C5FF45" }}>C</span>
      <span style={{ color: "#A78BFA" }}>E</span>
    </div>,
    { ...size },
  );
}
