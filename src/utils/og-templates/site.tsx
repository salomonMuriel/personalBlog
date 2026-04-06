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
      }}
    >
      {/* Main card with box shadow */}
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
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "90%",
              maxHeight: "90%",
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
                  fontSize: 72,
                  fontWeight: "bold",
                  textWrap: "balance",
                  letterSpacing: "-0.01em",
                }}
              >
                {SITE.title}
              </p>
              <p style={{ fontSize: 28, color: "#555" }}>{SITE.desc}</p>
            </div>
            {authorPhoto && (
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={authorPhoto}
                  alt="Salomon"
                  width={220}
                  height={220}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginBottom: "8px",
              fontSize: 28,
            }}
          >
            <span
              style={{
                overflow: "hidden",
                fontWeight: "bold",
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
