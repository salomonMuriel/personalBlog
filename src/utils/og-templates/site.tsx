/**
 * La tarjeta que sale al compartir el sitio. Es el mismo parte de
 * operación de la página: papel, rótulo mono arriba, el título en Alfa
 * Slab con la doble sombra roja, y el pie con los datos del taller.
 */
export default (lang: "es" | "en") => {
  const es = lang === "es";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#F2F1ED",
        color: "#16171A",
        fontFamily: "IBM Plex Mono",
      }}
    >
      {/* rótulo del parte */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 62,
          padding: "0 56px",
          background: "#16171A",
          color: "#9A988F",
          fontSize: 20,
          letterSpacing: 3.4,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "#EA4B3E", marginRight: 34 }}>
          {es ? "Parte de operación" : "Operations report"}
        </span>
        <span>{es ? "Bogotá, Colombia" : "Bogotá, Colombia"}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          padding: "0 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 8,
            width: 132,
            background: "#D8332A",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Alfa Slab One",
            fontSize: 106,
            lineHeight: 1.02,
            marginTop: 34,
            color: "#16171A",
            textTransform: "uppercase",
          }}
        >
          {es ? "Se arregla" : "We fix"}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Alfa Slab One",
            fontSize: 106,
            lineHeight: 1.02,
            color: "#B3251D",
            textTransform: "uppercase",
          }}
        >
          {es ? "lo chinomático" : "the fake-automated"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 28,
            lineHeight: 1.4,
            color: "#65665F",
            maxWidth: 940,
          }}
        >
          {es
            ? "Software hecho a la medida de tu empresa y de como ya trabajas."
            : "Custom software built to fit your company and how it already works."}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "2px solid #CFCDC4",
          margin: "0 56px",
          padding: "26px 0 34px",
          fontSize: 21,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#65665F",
        }}
      >
        <span style={{ color: "#16171A" }}>Salomón Muriel</span>
        <span>salomonmuriel.com</span>
      </div>
    </div>
  );
};
