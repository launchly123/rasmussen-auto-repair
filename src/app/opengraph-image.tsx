import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${business.name} — family-owned auto repair in Fresno, California since 1967`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1011",
          color: "#f4f1ea",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9aa0a4",
          }}
        >
          <div style={{ width: 56, height: 3, background: "#a32330" }} />
          <div>Fresno, California</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 24,
              fontSize: 190,
              lineHeight: 0.85,
              letterSpacing: -6,
            }}
          >
            1967
          </div>
          <div
            style={{
              marginTop: 34,
              fontSize: 52,
              lineHeight: 1.12,
              letterSpacing: -1,
              maxWidth: 900,
            }}
          >
            Rasmussen Auto Repair — built on nearly six decades of trust.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(244,241,234,0.18)",
            paddingTop: 28,
            fontSize: 26,
            color: "#9aa0a4",
          }}
        >
          <div>{business.addressShort}</div>
          <div style={{ color: "#d0666f" }}>{business.phone.display}</div>
        </div>
      </div>
    ),
    size,
  );
}
