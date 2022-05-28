import React from "react";
import { Button, Typography, Box, AppBar, Toolbar, Paper } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Layout.module.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const Layout: NextPage = ({ ...props }) => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  const handleSignOut = () => {
    userContext.token = "";
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Sans Food</title>
        <meta name="description" content="Generated by baaalint@codingsans" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <AppBar position="static" className={styles.appbar}>
          <Toolbar>
            <Typography variant="h3" className={styles.title} sx={{ flexGrow: 1 }}>
              <a href="/foods">Sans Food</a>
            </Typography>
            {!userContext.token ? (
              router.route.includes("login") ? null : (
                <Button variant="contained" color="info" className={styles.button} href="/login">
                  Login
                </Button>
              )
            ) : (
              <Button variant="contained" color="info" className={styles.button} onClick={() => handleSignOut()}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <main>
          <Paper className={styles.container} elevation={24}>
            <div
              className={styles.backbutton}
              onClick={async () => {
                router.back();
              }}
            >
              <ArrowBackIosNewIcon />
            </div>
            <div className={styles.content}>{props.children}</div>
          </Paper>
        </main>
      </Box>
    </>
  );
};