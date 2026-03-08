import { AbsoluteFill, Img, staticFile } from "remotion";

export const StaticPost: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#F7F3ED",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Subtle texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(139, 115, 85, 0.03) 0%, transparent 50%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 50,
        }}
      >
        {/* Header badge */}
        <div
          style={{
            background: "#5C4A32",
            color: "#F7F3ED",
            padding: "12px 28px",
            borderRadius: 4,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 35,
          }}
        >
          Just In Stock
        </div>

        {/* Main illustration card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 8,
            boxShadow: `
              0 2px 4px rgba(0,0,0,0.04),
              0 12px 32px rgba(92, 74, 50, 0.12)
            `,
            padding: 20,
            marginBottom: 30,
            maxWidth: 700,
          }}
        >
          <Img
            src={staticFile("Hop.jpg")}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 4,
              display: "block",
            }}
          />
        </div>

        {/* Book title */}
        <h1
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: "#3D3428",
            margin: 0,
            marginBottom: 8,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Guess How Much I Love You
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 20,
            color: "#6B5D4D",
            margin: 0,
            marginBottom: 35,
            textAlign: "center",
          }}
        >
          Lovingly restored from a beloved classic
        </p>

        {/* Decorative divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 25,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "#C4B49A",
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#8B7355",
            }}
          />
          <div
            style={{
              width: 40,
              height: 1,
              background: "#C4B49A",
            }}
          />
        </div>

        {/* Logo */}
        <Img
          src={staticFile("logo.png")}
          style={{
            width: 160,
            height: "auto",
          }}
        />
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 40,
          height: 40,
          borderLeft: "2px solid #C4B49A",
          borderTop: "2px solid #C4B49A",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 40,
          height: 40,
          borderRight: "2px solid #C4B49A",
          borderBottom: "2px solid #C4B49A",
        }}
      />
    </AbsoluteFill>
  );
};
