import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/react-hooks";

import { CommonTemplate, CommonLoading, CommonError } from "../../context";
import { AuthCard } from "../../organisms";
import { LOGIN_USER } from "../../../assets/utils/Queries";
import { Context } from "../../context";

const StyledAuthPage = styled.div``;

function AuthPage() {
    const [login, { loading: loginLoading, error: loginError, data: loginData }] = useMutation(LOGIN_USER);
    const [userID, setUserID] = useState("");
    const [userPW, setUserPW] = useState("");
    const [cookies, setCookie] = useCookies(["user"]);
    const { history } = useContext(Context);

    useEffect(() => {
        if (loginData) {
            setCookie("user", loginData.login, { path: "/" });
        }
    }, [loginData]);

    if (loginLoading) return <CommonLoading>Login</CommonLoading>;
    if (loginError) return <CommonError>Login</CommonError>;
    if (cookies.user) {
        return <Redirect to="/" />;
    }

    const getUserID = (value: string): void => {
        setUserID(value);
    };

    const getUserPW = (value: string): void => {
        setUserPW(value);
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

    return (
        <CommonTemplate>
            <StyledAuthPage>
                <AuthCard getUserID={getUserID} getUserPW={getUserPW} loginSubmit={loginSubmit}>
                    Login to Trello
                </AuthCard>
            </StyledAuthPage>
        </CommonTemplate>
    );
}

export default AuthPage;
