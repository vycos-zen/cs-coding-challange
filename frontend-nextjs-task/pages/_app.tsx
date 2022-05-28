import React from "react";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { UserContextProvider } from "../context/providers/UserContextProvider";
import "../styles/global.scss";

const SansFoodApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </React.StrictMode>
  );
};

export default SansFoodApp;
