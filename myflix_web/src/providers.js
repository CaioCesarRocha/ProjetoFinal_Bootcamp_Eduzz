import React from "react";
import App from "./App";
import { ResetCSS } from "./global/resetCSS";
import MovieProvider from "./providers/movieProvider";

const Providers = () => {
  return (
    <main>
      <MovieProvider>
        <ResetCSS />
        <App />
      </MovieProvider>
    </main>
  );
};

export default Providers;