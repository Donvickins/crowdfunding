import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import { StateContextProvider } from "./contexts";
import { ThirdwebProvider } from "thirdweb/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <BrowserRouter>
    <ThirdwebProvider>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </ThirdwebProvider>
  </BrowserRouter>
  //</React.StrictMode>
);
