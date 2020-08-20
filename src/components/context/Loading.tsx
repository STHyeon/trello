import React from "react";
import styled, { keyframes } from "styled-components";

import { CommonProps } from "../../assets/utils/CommonType";
import { CommonTemplate } from "./CommonTemplate";

const loader = keyframes`
    90% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
`;

const top = keyframes`
    90% { transform: scale(0); }
    100% { transform: scale(0); }
`;

const bottom = keyframes`
    10% { transform: scale(0); }
    90% { transform: scale(1); }
    100% { transform: scale(1); }
`;

const line = keyframes`
    10% { height: 40px; }
    100% { height: 40px; }
`;

const text = keyframes`
    0% { transform: scale(1) }
    100% { transform: scale(1.3) }
    0% { transform: scale(1) }
`;

const StyledContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);

    .loading_txt {
        padding: 10px 0 0;
        font-weight: bold;
        font-size: 25px;
        animation: ${text} 1s infinite;
    }
`;

const StyledLoading = styled.div`
    width: 81px;
    height: 80px;
    margin: 0 auto;
    animation: ${loader} 5s cubic-bezier(0.8, 0, 0.2, 1) infinite;

    .top {
        width: 1px;
        height: 0px;
        border-top: 40px solid #1b93d8d9;
        border-right: 40px solid transparent;
        border-left: 40px solid transparent;
        transform-origin: 50% 100%;
        animation: ${top} 5s linear infinite;
    }

    .bottom {
        width: 1px;
        height: 0px;
        border-right: 40px solid transparent;
        border-bottom: 40px solid #1b93d8d9;
        border-left: 40px solid transparent;
        transform: scale(0);
        transform-origin: 50% 100%;
        animation: ${bottom} 5s linear infinite;
    }

    .line {
        position: absolute;
        top: 40px;
        left: 40px;
        width: 0px;
        height: 0px;
        border-left: 1px dotted #1b93d8d9;
        animation: ${line} 5s linear infinite;
    }
`;

function CommonLoading({ children }: CommonProps) {
    return (
        <CommonTemplate>
            <StyledContainer>
                <StyledLoading>
                    <div className="top"></div>
                    <div className="bottom"></div>
                    <div className="line"></div>
                </StyledLoading>
                <div className="loading_txt">{children} Loading...</div>
            </StyledContainer>
        </CommonTemplate>
    );
}

export default CommonLoading;
