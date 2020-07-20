import React from "react";
import { Span } from "../../atoms";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardHeaderProps extends CommonProps {
    border?: boolean;
}

const CardHeaderStyle = styled.div<CardHeaderProps>`
    margin: 0 0 10px;

    ${(props) =>
        props.border &&
        css`
            padding: 0 0 10px;
            border-bottom: 1px solid #6d8aff;
        `}
`;

function CardHeader({ children, ...props }: CardHeaderProps) {
    return (
        <CardHeaderStyle border>
            <Span>{children}</Span>
        </CardHeaderStyle>
    );
}

export default CardHeader;
