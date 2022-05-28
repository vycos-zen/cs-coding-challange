import React from "react";
import { UserContext } from "../UserContext";
import { LoginResponse } from "../../schema/LoginResponse";
import { User } from "../../schema/User";

export const UserContextProvider: React.FC = ({ ...props }) => {
  const context = React.useContext<User & LoginResponse>(UserContext);

  if (typeof window !== "undefined") {
    context.token = localStorage.getItem("token") ?? "";
  }

  return <UserContext.Provider value={context}>{props.children}</UserContext.Provider>;
};
