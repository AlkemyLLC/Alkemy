import Typography from "typography";

const typography = new Typography({
    title: "Alkemy Typography",
    fontDisplay: "swap",
    baseFontSize: "20px",
    baseLineHeight: 2,
    scaleRatio: 2,
    headerFontFamily: [
        "Avenir Next",
        "Helvetica Neue",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
    bodyFontFamily: [
        "Avenir Next",
        "Helvetica Neue",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
});

export const { scale, rhythm, options } = typography;
export default typography;
