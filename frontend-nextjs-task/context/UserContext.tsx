import React from "react";
import { User } from "../schema/User";
import { LoginResponse } from "../schema/LoginResponse";

export const UserContext = React.createContext<User & LoginResponse>({ username: "", password: "", token: "" });
