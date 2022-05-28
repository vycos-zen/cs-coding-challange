import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Stack, TextField } from "@mui/material";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Layout.module.scss";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const userContext = React.useContext(UserContext);

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState({ isUserNameValid: true, isPasswordValid: true });

  React.useEffect(() => {
    const redirectOnExistingToken = () => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("token") || userContext.token) {
          router.push("/foods");
          return;
        }
      }
    };

    redirectOnExistingToken();
  }, []);

/*   React.useEffect(() => {
    validateFields();
  }, [userName, password]);
 */
  const validateFields = () => {
    setIsFormValid({ isUserNameValid: userName.length > 0, isPasswordValid: password.length > 0 });
  };

  const handleSignIn = async () => {
    try {
      const data = { username: userName, password: password };
      if (isFormValid.isPasswordValid && isFormValid.isUserNameValid) {
        const loginRes = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const loginData = await loginRes.json();
        if (loginData.token) {
          userContext.token = loginData.token;
          localStorage.setItem("token", loginData.token);
          router.push("/foods");
        } else {
          setIsFormValid({ isUserNameValid: false, isPasswordValid: false });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Stack>
          <TextField
            id="username"
            required
            type="text"
            label="Email"
            value={userName}
            className={styles.forminput}
            error={!isFormValid.isUserNameValid}
            color="info"
            focused
            onChange={(event) => {
              event.preventDefault();
              setUserName(event.target.value);
              validateFields();
            }}
          />
          <TextField
            id="password"
            required
            label="Password"
            type="password"
            value={password}
            className={styles.forminput}
            autoComplete="current-password"
            focused
            error={!isFormValid.isPasswordValid}
            onChange={(event) => {
              event.preventDefault();
              setPassword(event.target.value);
              validateFields();
            }}
          />
          <Button
            variant="contained"
            color="info"
            disabled={!isFormValid.isUserNameValid || !isFormValid.isPasswordValid}
            className={styles.formbutton}
            onClick={(e) => {
              e.preventDefault();
              validateFields();
              if (isFormValid.isUserNameValid && isFormValid.isPasswordValid) {
                handleSignIn();
              }
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default LoginPage;
