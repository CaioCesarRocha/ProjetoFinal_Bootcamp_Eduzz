import React from "react";
import App from "./App";
import { ResetCSS } from "./global/resetCSS";
import MovieProvider from "./providers/movieProvider";
import AuthProvider from "./providers/authProvider";

const Providers = () => {
  return (
    <main>
      <AuthProvider>
        <MovieProvider>
          <ResetCSS />
          <App />
        </MovieProvider>
      </AuthProvider>
    </main>
  );
};

export default Providers;