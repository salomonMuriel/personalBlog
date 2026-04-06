import { SITE } from "@config";

export default (authorPhoto: string) => {
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
          color: "#111110",
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
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexShrink: 1,
                marginRight: 40,
              }}
            >
              <p
                style={{
                  fontFamily: "Syne",
                  fontSize: 68,
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {SITE.title}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans",
                  fontSize: 28,
                  color: "#555555",
                  margin: 0,
                  marginTop: 12,
                }}
              >
                {SITE.desc}
              </p>
            </div>
            {authorPhoto && (
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  display: "flex",
                }}
              >
                <img
                  src={authorPhoto}
                  alt="Salomon"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexShrink: 0,
              paddingTop: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: 24,
                color: "#cc2b2b",
                letterSpacing: "0.02em",
              }}
            >
              {new URL(SITE.website).hostname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
