import React from "react";
import styled from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface LinksProps extends CommonProps {}

const LinksStyle = styled.a<LinksProps>``;

function Links({ children, ...props }: LinksProps) {
    return <LinksStyle {...props}>{children}</LinksStyle>;
}

export default Links;
