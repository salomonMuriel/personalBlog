import { SITE } from "@config";

export default () => {
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
          color: "rgb(232, 233, 235)",
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
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
              maxHeight: "90%",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "row", height: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: 72, fontWeight: "bold" }}>
                  {SITE.title} 🚀
                </p>
                <p style={{ fontSize: 28 }}>{SITE.desc}</p>
              </div>
              <div
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginLeft: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <img
                  src={`${SITE.website}salomon.jpg`}
                  alt="Salomon"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
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
            <span style={{ overflow: "hidden", fontWeight: "bold" }}>
              {new URL(SITE.website).hostname}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
