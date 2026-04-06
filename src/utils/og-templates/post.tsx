import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

export default (
  post: CollectionEntry<"ideas" | "blog">,
  authorPhoto: string
) => {
  // Normalize to NFC and strip invisible Unicode control characters.
  // LinkedIn-synced titles may contain NFD combining accents or zero-width
  // spaces (U+200B) inserted by the LLM translation pipeline — both render
  // as black-box glyphs in Satori when the font has no matching glyph.
  const title = post.data.title
    .normalize("NFC")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, "");

  return (
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          border: "4px solid #cc2b2b",
          background: "#ffffff",
          borderRadius: "4px",
          boxShadow: "8px 8px 0px #cc2b2b",
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "28px 32px",
            width: "100%",
            height: "100%",
            color: "#111110",
            boxSizing: "border-box",
          }}
        >
          {/* Title — grows to fill available space, clamped to 4 lines */}
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              overflow: "hidden",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontFamily: "Syne",
                fontSize: 56,
                fontWeight: 700,
                lineClamp: 4,
                lineHeight: 1.2,
                wordBreak: "break-word",
                margin: 0,
              }}
            >
              {title}
            </p>
          </div>

          {/* Footer row — always pinned to bottom */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
              paddingTop: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: 28,
                color: "#cc2b2b",
                letterSpacing: "0.02em",
              }}
            >
              {SITE.title}
            </span>
            {authorPhoto && (
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  flexShrink: 0,
                }}
              >
                <img
                  src={authorPhoto}
                  alt="Salomon"
                  width={160}
                  height={160}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
