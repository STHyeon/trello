import React from "react";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface SpanProps extends CommonProps {}

const StyledSpan = styled.span<SpanProps>``;

function Span({ children, ...props }: SpanProps) {
    return <StyledSpan {...props}>{children}</StyledSpan>;
}

export default Span;
