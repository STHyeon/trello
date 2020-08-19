import React from "react";
import { CommonTemplate } from "./CommonTemplate";
import styled from "styled-components";

const StyledError = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 30px;
`;

function CommonError({ children }: any) {
    return (
        <CommonTemplate>
            <StyledError>{children ? children.replace("GraphQL error: ", "") : Error}</StyledError>;
        </CommonTemplate>
    );
}

export default CommonError;
