import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0C",
        borderRadius: 12,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -1,
      }}
    >
      <span style={{ color: "#C5FF45" }}>C</span>
      <span style={{ color: "#A78BFA" }}>E</span>
    </div>,
    { ...size },
  );
}
