import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0A0A0C",
        color: "#F5F3F0",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: 1,
          padding: "64px",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#C5FF45",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          CreatorRise
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1 }}>
          Creators Rise.
        </div>
      </div>
      <div
        style={{ display: "flex", width: 2, background: "rgba(245,243,240,0.3)", margin: "48px 0" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flex: 1,
          padding: "64px",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#A78BFA",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          CampusEdge
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1 }}>
          Campuses Shine.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 56,
          display: "flex",
          fontSize: 28,
          color: "#A4A0AA",
        }}
      >
        {SITE.name}
      </div>
    </div>,
    { ...size },
  );
}
