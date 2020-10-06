import Typography from "typography";

const typography = new Typography({
    title: "Alkemy Typography",
    fontDisplay: "swap",
    includeNormalize: true,
    baseFontSize: "16px",
    baseLineHeight: 1.666,
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

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
