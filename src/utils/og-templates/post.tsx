import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

export default (
  post: CollectionEntry<"ideas" | "blog">,
  authorPhoto: string
) => {
  return (
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main card with box shadow replacing the offset-div trick */}
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
            margin: "20px",
            width: "90%",
            height: "90%",
            color: "#111110",
          }}
        >
          <p
            style={{
              fontSize: 68,
              fontWeight: "bold",
              lineClamp: 4,
              textWrap: "balance",
              wordBreak: "break-word",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "8px",
              background: "transparent",
              fontSize: 28,
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                background: "transparent",
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
                  justifyContent: "center",
                  alignItems: "center",
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
