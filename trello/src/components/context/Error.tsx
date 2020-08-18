import React from "react";
import { CommonProps } from "../../assets/utils/CommonType";
import styled from "styled-components";

const StyledError = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 30px;
`;

function CommonError({ children }: CommonProps) {
    return <StyledError>{children} Error</StyledError>;
}

export default CommonError;
