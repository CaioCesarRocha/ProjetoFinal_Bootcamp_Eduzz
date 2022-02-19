import React from "react";
import App from "./App";
import { ResetCSS } from "./global/resetCSS";
import MovieProvider from "./providers/movieProvider";
import UserProvider from "./providers/userProvider";

const Providers = () => {
  return (
    <main>
      <UserProvider>
        <MovieProvider>
          <ResetCSS />
          <App />
        </MovieProvider>
      </UserProvider>
    </main>
  );
};

export default Providers;