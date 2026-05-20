import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const runtime = "nodejs";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C0C14",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient orb */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              background: "linear-gradient(135deg, #818CF8 0%, #A78BFA 60%, #C084FC 100%)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Dzakri Phalosa Nugroho
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#9896AF",
              fontWeight: 400,
            }}
          >
            Web Developer · Administrasi · IT Support
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {["Laravel", "WordPress", "CodeIgniter", "Pekalongan"].map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid rgba(129, 140, 248, 0.35)",
                  borderRadius: "999px",
                  color: "#C4B5FD",
                  fontSize: 18,
                  padding: "8px 14px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#6C6A7D",
              marginTop: "8px",
            }}
          >
            xenzee.site
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
