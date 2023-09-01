import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "./index.css";
import Router from "./router/router.jsx";
import { StrictMode } from "react";

const theme = extendTheme({
  colors: {
    brand: {
      loginBG:
        "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(235,243,241,1) 100%)",
      mainBG: "#EBF3F1",
      P1: "#002D32",
      P2: "#005A64",
      P3: "#4CDDDD",
      S1: "#6FFFAF",
      S2: "#CEFFAE",
      S3: "#FFCE00",
    },
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
    pedrao: "1920px",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
);
