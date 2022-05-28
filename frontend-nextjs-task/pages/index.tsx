import React from "react";
import type { NextPage } from "next";
import { Typography, Box } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.scss";

const HomePage: NextPage = ({ ...props }) => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  React.useEffect(() => {
    const userTokenConfig = () => {
      if (typeof window === "undefined") {
        if (userContext.token) {
          router.push("/foods");
        }
      }
    };
    userTokenConfig();
  }, [userContext.token]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h2" className={styles.title} sx={{ flexGrow: 1 }}>
        Welcome to Sans Food &#127793;
      </Typography>
      <Typography variant="h4" className={styles.title} sx={{ flexGrow: 1 }}>
        ...it is a nice day today...
      </Typography>
    </Box>
  );
};

export default HomePage;
