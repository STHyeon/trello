import React from "react";

import styled from "styled-components";

import { CommonProps } from "../../../assets/utils/CommonType";
import { Title, CreateBtn, CardInputBody } from "../../molecules";

interface AuthProps extends CommonProps {
    authCard?: boolean;
    authMode?: boolean;

    loginSubmit?(): void;
    signupSubmit?(): void;
    changeAuthMode?(): void;
    getUserID?(value: string, id?: string): void;
    getUserPW?(value: string, id?: string): void;
    getUserName?(value: string, id?: string): void;
}

const StyledAuthCardMap = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
`;

const StyledAuthCard = styled.div`
    margin: 0 0 20px;
    padding: 0 0 20px;
    border-bottom: 1px solid gray;

    h2 {
        padding: 0 0 30px;
        font-weight: bold;
        font-size: 20px;
        color: #5e6c84;
    }

    button {
        width: 100%;
        margin: 17px 0 0;
        padding: 10px 0;
        border-radius: 5px;
        font-weight: bold;
        font-size: 17px;
        color: #ffffff;
        background: #5aac44;

        &:hover {
            background: #4f9d3a;
        }
    }
`;

function AuthCard({ children, ...props }: AuthProps) {
    const { authMode, getUserID, getUserPW, getUserName, loginSubmit, signupSubmit, changeAuthMode } = props;
    return (
        <StyledAuthCardMap>
            <StyledAuthCard>
                <Title>{authMode ? " Register to Trello" : "Login to Trello"}</Title>
                <CardInputBody authCard getValue={getUserID} placeholder="아이디를 입력해주세요." />
                {authMode ? <CardInputBody authCard getValue={getUserName} placeholder="이름을 입력해주세요." /> : null}
                <CardInputBody authCard getValue={getUserPW} placeholder="비밀번호를 입력해주세요." />
                <CreateBtn justButton={authMode ? signupSubmit : loginSubmit}>{authMode ? "회원가입" : "로그인"}</CreateBtn>
            </StyledAuthCard>
            {authMode ? null : (
                <CreateBtn authBtn changeMode={changeAuthMode}>
                    회원가입하러 가기
                </CreateBtn>
            )}
        </StyledAuthCardMap>
    );
}

export default AuthCard;
