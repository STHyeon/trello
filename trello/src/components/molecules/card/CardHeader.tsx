import React from "react";
import { Span } from "../../atoms";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardHeaderProps extends CommonProps {
    border?: boolean;
    bdColor?: string;
}

const StyledCardHeader = styled.div<CardHeaderProps>`
    margin: 0 0 10px;

    ${(props) =>
        props.border &&
        css`
            padding: 10px 0;
            border-bottom: 1px solid;
        `}
        border-color: ${(props) => props.bdColor || "#6d8aff"};
`;

function CardHeader({ children, ...props }: CardHeaderProps) {
    const { bdColor } = props;

    return (
        <StyledCardHeader {...props} bdColor={bdColor}>
            <Span>{children}</Span>
        </StyledCardHeader>
    );
}

export default CardHeader;
