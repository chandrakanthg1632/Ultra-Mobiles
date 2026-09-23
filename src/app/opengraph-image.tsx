import { ImageResponse } from "next/og";

export const alt = "Ultra Mobiles Training Institute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#fff",
            fontSize: 64,
            marginBottom: 36,
          }}
        >
          🛠️
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          Ultra Mobiles Training Institute
        </div>
        <div style={{ fontSize: 30, color: "#ffedd5", marginTop: 18 }}>
          Hands-on Mobile Repairing Courses
        </div>
      </div>
    ),
    { ...size },
  );
}
