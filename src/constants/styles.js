import colors from "./colors";

const styles = {
  title: {
    fontWeight: 700,
  },
  backdrop: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  body: {
    whiteSpace: "pre-wrap",
    "& ::-webkit-scrollbar": {
      width: 7,
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: colors.primary,
      borderRadius: 7,
    },
  },
  noClickHighlight: {
    "-webkit-tap-highlight-color": "transparent",
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  },
};

export default styles;
