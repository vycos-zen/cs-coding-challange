import React from "react";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import styles from "../styles/Layout.module.scss";

const NotFoundPage: NextPage = () => {
  return (
    <Box>
      <Typography variant="h4" className={styles.warning} sx={{ flexGrow: 1 }}>
        oops, it's a 404 scotty
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
