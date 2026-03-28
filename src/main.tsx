import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ModalContextProvider from "./contexts/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ModalContextProvider>
    <App />
  </ModalContextProvider>,
);
