import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { BookContextProvider } from "./context/BookContext.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}

// Optional: Report web vitals
reportWebVitals();
