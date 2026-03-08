import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const PAGES = [
  { file: "Hop.jpg", quote: '"I love you as high as I can HOP!"' },
  { file: "Across the river.jpg", quote: '"I love you across the river and over the hills"' },
  { file: "Up to my toes.jpg", quote: '"I love you all the way up to my toes!"' },
];

const PAGE_DURATION = 90; // 3 seconds per page
const TRANSITION_DURATION = 20;

type PageProps = {
  file: string;
  quote: string;
  isLast?: boolean;
};

const Page: React.FC<PageProps> = ({ file, quote, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const entry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
    durationInFrames: 30,
  });

  // Exit animation (fade out at end)
  const exitStart = PAGE_DURATION - TRANSITION_DURATION;
  const exitOpacity = isLast
    ? 1
    : interpolate(frame, [exitStart, PAGE_DURATION], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  // Subtle Ken Burns
  const scale = interpolate(frame, [0, PAGE_DURATION], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  // Quote reveal
  const quoteReveal = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const cardY = interpolate(entry, [0, 1], [60, 0]);
  const cardOpacity = interpolate(entry, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      {/* Page card */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: `translateX(-50%) translateY(${cardY}px)`,
          opacity: cardOpacity,
          width: "85%",
          maxWidth: 900,
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 12,
            boxShadow: `
              0 4px 8px rgba(0,0,0,0.06),
              0 20px 50px rgba(92, 74, 50, 0.15)
            `,
            padding: 24,
            overflow: "hidden",
          }}
        >
          <div style={{ overflow: "hidden", borderRadius: 6 }}>
            <Img
              src={staticFile(file)}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: "50%",
          transform: `translateX(-50%) translateY(${interpolate(quoteReveal, [0, 1], [20, 0])}px)`,
          opacity: quoteReveal,
          width: "80%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontStyle: "italic",
            color: "#5C4A32",
            fontFamily: "'Georgia', serif",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {quote}
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const GuessHowMuchVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Intro animation
  const introEntry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Outro (last 30 frames)
  const outroStart = durationInFrames - 45;
  const outroOpacity = interpolate(
    frame,
    [outroStart, durationInFrames - 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Header reveal for intro
  const headerY = interpolate(introEntry, [0, 1], [-30, 0]);
  const headerOpacity = introEntry;

  return (
    <AbsoluteFill
      style={{
        background: "#F7F3ED",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Warm gradient overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(255,250,240,0.5) 0%, transparent 60%)`,
        }}
      />

      {/* Header - always visible */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${headerY}px)`,
          opacity: headerOpacity,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "#5C4A32",
            color: "#F7F3ED",
            padding: "10px 24px",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            marginBottom: 12,
            display: "inline-block",
          }}
        >
          Just In Stock
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#3D3428",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Guess How Much I Love You
        </h1>
      </div>

      {/* Page sequences */}
      {PAGES.map((page, index) => (
        <Sequence
          key={page.file}
          from={index * (PAGE_DURATION - TRANSITION_DURATION) + 30}
          durationInFrames={PAGE_DURATION}
        >
          <Page {...page} isLast={index === PAGES.length - 1} />
        </Sequence>
      ))}

      {/* Footer tagline - fades in after pages */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: interpolate(frame, [60, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#8B7355",
            letterSpacing: 2,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          A Second Life for Treasured Stories
        </p>
      </div>

      {/* Outro - Logo reveal */}
      <AbsoluteFill
        style={{
          background: "#F7F3ED",
          opacity: outroOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 22,
              fontStyle: "italic",
              color: "#5C4A32",
              marginBottom: 30,
            }}
          >
            Lovingly restored from a beloved classic
          </p>
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 200,
              height: "auto",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 25,
          left: 25,
          width: 35,
          height: 35,
          borderLeft: "2px solid rgba(196, 180, 154, 0.6)",
          borderTop: "2px solid rgba(196, 180, 154, 0.6)",
          opacity: introEntry,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 25,
          right: 25,
          width: 35,
          height: 35,
          borderRight: "2px solid rgba(196, 180, 154, 0.6)",
          borderBottom: "2px solid rgba(196, 180, 154, 0.6)",
          opacity: introEntry,
        }}
      />
    </AbsoluteFill>
  );
};
