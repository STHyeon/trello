import React from "react";
import { Span } from "../../atoms";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardHeaderProps extends CommonProps {
    border?: boolean;
    bd_color?: string;
}

const StyledCardHeader = styled.div<CardHeaderProps>`
    margin: 0 0 10px;

    ${(props) =>
        props.border &&
        css`
            padding: 10px 0;
            border-bottom: 1px solid;
        `}
        border-color: ${(props) => props.bd_color || "#6d8aff"};
`;

function CardHeader({ children, ...props }: CardHeaderProps) {
    const { bd_color } = props;
    return (
        <StyledCardHeader {...props} bd_color={bd_color}>
            <Span>{children}</Span>
        </StyledCardHeader>
    );
}

export default CardHeader;
