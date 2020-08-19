import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/react-hooks";

import { CommonTemplate, CommonLoading, CommonError } from "../../context";
import { AuthCard } from "../../organisms";
import { LOGIN_USER, CREATE_USER } from "../../../assets/utils/Queries";

const StyledAuthPage = styled.div``;

function AuthPage() {
    const [login, { loading: loginLoading, error: loginError, data: loginData }] = useMutation(LOGIN_USER);
    const [signup, { loading: signupLoading, error: signupError }] = useMutation(CREATE_USER);
    const [userID, setUserID] = useState("");
    const [userPW, setUserPW] = useState("");
    const [userName, setUserName] = useState("");
    const [authMode, setAuthMode] = useState(false);
    const [cookies, setCookie] = useCookies(["user"]);
    const history = useHistory();

    useEffect(() => {
        if (loginData) {
            setCookie("user", loginData.login, { path: "/" });
        }
    }, [loginData, setCookie]);

    if (loginLoading) return <CommonLoading>Login</CommonLoading>;
    if (loginError) return <CommonError>{loginError.message}</CommonError>;

    if (signupLoading) return <CommonLoading>Sign Up</CommonLoading>;
    if (signupError) return <CommonError>{signupError.message}</CommonError>;

    if (cookies.user) {
        return <Redirect to="/" />;
    }

    const getUserID = (value: string): void => {
        setUserID(value);
    };

    const getUserPW = (value: string): void => {
        setUserPW(value);
    };

    const getUserName = (value: string): void => {
        setUserName(value);
    };

    const changeAuthMode = (): void => {
        setAuthMode(true);
    };

    const loginSubmit = (): void => {
        if (userID.length > 0 && userPW.length > 0) {
            login({ variables: { userID: userID, userPW: userPW } })
                .then(() => history.push("/"))
                .catch(() => {});
            setUserID("");
            setUserPW("");
        } else {
            alert("빈칸을 채워주세요.");
        }
    };

    const signupSubmit = (): void => {
        if (userID.length > 0 && userPW.length > 0 && userName.length) {
            signup({ variables: { userID: userID, userName: userName, userPW: userPW } })
                .then(() => history.push("/"))
                .catch(() => {});
            setUserID("");
            setUserPW("");
            setUserName("");
        } else {
            alert("빈칸을 채워주세요.");
        }
    };

    return (
        <CommonTemplate>
            <StyledAuthPage>
                <AuthCard authMode={authMode} getUserID={getUserID} getUserPW={getUserPW} getUserName={getUserName} loginSubmit={loginSubmit} signupSubmit={signupSubmit} changeAuthMode={changeAuthMode} />
            </StyledAuthPage>
        </CommonTemplate>
    );
}

export default AuthPage;
