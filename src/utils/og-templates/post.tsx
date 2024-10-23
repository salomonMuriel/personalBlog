import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

export default (post: CollectionEntry<"blog">) => {
  return (
    <div
      style={{
        background: "rgb(0, 34, 79)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          border: "4px solid rgb(255, 111, 89)",
          background: "rgb(0, 34, 79)",
          opacity: "0.9",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      />

      <div
        style={{
          border: "4px solid rgb(255, 111, 89)",
          background: "rgb(0, 34, 79)",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
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
            color: "rgb(232, 233, 235)",
          }}
        >
          <p
            style={{
              fontSize: 72,
              fontWeight: "bold",
              maxHeight: "84%",
              overflow: "visible",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginBottom: "8px",
              background: "transparent",
              fontSize: 28,
            }}
          >
            <span style={{ fontWeight: "bold", background: "transparent" }}>
              {SITE.title}
            </span>
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                overflow: "hidden",
                marginLeft: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "auto",
                marginBottom: "auto",
                background: "transparent",
              }}
            >
              <img
                src="http://localhost:4321/salomon.jpg"
                alt="Salomon"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
