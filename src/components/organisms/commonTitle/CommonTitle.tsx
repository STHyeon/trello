import React from "react";
import { Title } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface CommonTitleProps extends CommonProps {
    startTitle?: boolean;
}

const StyledCommonTitle = styled.div<CommonTitleProps>`
    ${(props) =>
        props.startTitle &&
        css`
            margin: 0 0 10px;
            padding: 0 0 5px;
            border-bottom: 1px solid #677b9b;

            h2 {
                font-weight: bold;
                font-size: 20px;
            }
        `}
`;

function CommonTitle({ children, ...props }: CommonTitleProps) {
    return (
        <StyledCommonTitle {...props}>
            <Title>{children}</Title>
        </StyledCommonTitle>
    );
}

export default CommonTitle;
