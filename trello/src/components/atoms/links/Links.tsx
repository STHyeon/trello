import React from "react";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface LinksProps extends CommonProps {}

const StyledLink = styled.a<LinksProps>``;

function Links({ children, ...props }: LinksProps) {
    return <StyledLink {...props}>{children}</StyledLink>;
}

export default Links;
