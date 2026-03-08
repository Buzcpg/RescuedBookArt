import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  imagePath: string;
};

export const HairyMaclary: React.FC<Props> = ({ imagePath }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Spring animations for smooth natural movement
  const cardEntry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
    durationInFrames: 40,
  });

  const headerReveal = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 30,
  });

  const taglineReveal = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 90 },
    durationInFrames: 35,
  });

  const footerReveal = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14, stiffness: 90 },
    durationInFrames: 30,
  });

  // Subtle Ken Burns zoom on the illustration
  const kenBurns = interpolate(frame, [0, 180], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  // Gentle floating animation after entry
  const floatY = Math.sin(frame * 0.05) * 3;
  const floatRotate = Math.sin(frame * 0.03) * 0.3;

  // Card transforms
  const cardY = interpolate(cardEntry, [0, 1], [150, 0]);
  const cardOpacity = interpolate(cardEntry, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(cardEntry, [0, 1], [0.9, 1]);

  // Paper texture grain animation
  const grainOffset = frame % 3;

  const isVertical = height > width;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #F5F0E8 0%, #E8E0D0 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Subtle paper texture overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          transform: `translate(${grainOffset}px, ${grainOffset}px)`,
        }}
      />

      {/* Main content card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${cardY + floatY}px) scale(${cardScale}) rotate(${floatRotate}deg)`,
          opacity: cardOpacity,
          width: isVertical ? "85%" : "90%",
          maxWidth: 900,
        }}
      >
        {/* Card background */}
        <div
          style={{
            background: "#FAF8F3",
            borderRadius: 12,
            boxShadow: `
              0 4px 6px rgba(0,0,0,0.05),
              0 20px 40px rgba(0,0,0,0.08),
              0 40px 80px rgba(0,0,0,0.05)
            `,
            padding: isVertical ? 40 : 50,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header - "This Just In..." */}
          <div
            style={{
              transform: `translateY(${interpolate(headerReveal, [0, 1], [20, 0])}px)`,
              opacity: headerReveal,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <div
                style={{
                  height: 3,
                  width: interpolate(headerReveal, [0, 1], [0, 60]),
                  background: "#8B7355",
                  borderRadius: 2,
                }}
              />
              <h1
                style={{
                  fontSize: isVertical ? 48 : 56,
                  fontWeight: 400,
                  color: "#3D3428",
                  margin: 0,
                  fontStyle: "italic",
                  letterSpacing: 1,
                }}
              >
                This Just In...
              </h1>
            </div>
          </div>

          {/* Main illustration container */}
          <div
            style={{
              position: "relative",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
              background: "#F0EBE0",
              marginBottom: 25,
            }}
          >
            <div
              style={{
                transform: `scale(${kenBurns})`,
                transformOrigin: "center center",
              }}
            >
              <Img
                src={staticFile("29.png")}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              transform: `translateY(${interpolate(taglineReveal, [0, 1], [15, 0])}px)`,
              opacity: taglineReveal,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: isVertical ? 28 : 32,
                fontStyle: "italic",
                color: "#5C4E3C",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              freshly rescued from a{" "}
              <span style={{ color: "#8B5A2B", fontWeight: 600 }}>
                beloved Classic
              </span>
            </p>
          </div>

          {/* Footer tagline */}
          <div
            style={{
              transform: `translateY(${interpolate(footerReveal, [0, 1], [10, 0])}px)`,
              opacity: footerReveal,
              textAlign: "center",
              paddingTop: 15,
              borderTop: "1px solid rgba(139, 115, 85, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: isVertical ? 14 : 16,
                fontWeight: 500,
                color: "#8B7355",
                margin: 0,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              A Second Life for Treasured Stories
            </p>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 60,
          height: 60,
          borderLeft: "2px solid rgba(139, 115, 85, 0.3)",
          borderTop: "2px solid rgba(139, 115, 85, 0.3)",
          opacity: interpolate(frame, [20, 50], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          borderRight: "2px solid rgba(139, 115, 85, 0.3)",
          borderBottom: "2px solid rgba(139, 115, 85, 0.3)",
          opacity: interpolate(frame, [20, 50], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
