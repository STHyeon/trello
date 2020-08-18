import React from "react";

import styled from "styled-components";

import { CommonProps } from "../../../assets/utils/CommonType";
import { Title, CreateBtn, CardInputBody, NavBox } from "../../molecules";

interface AuthProps extends CommonProps {
    authCard?: boolean;

    getUserID?(value: string, id?: string): void;
    getUserPW?(value: string, id?: string): void;
    loginSubmit?(): void;
}

const StyledAuthCardMap = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    text-align: center;

    a {
        font-size: 14px;
        color: #1460d0;
    }
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
    const { getUserID, getUserPW, loginSubmit } = props;
    return (
        <StyledAuthCardMap>
            <StyledAuthCard>
                <Title>{children}</Title>
                <CardInputBody authCard getValue={getUserID} />
                <CardInputBody authCard getValue={getUserPW} />
                <CreateBtn justButton={loginSubmit}>로그인</CreateBtn>
            </StyledAuthCard>
            <NavBox normal link="#">
                회원가입하러 가기
            </NavBox>
        </StyledAuthCardMap>
    );
}

export default AuthCard;
