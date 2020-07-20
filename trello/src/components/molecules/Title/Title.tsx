import React from "react";
import { H2 } from "../../atoms";
import { CommonProps } from "../../../assets/utils/CommonType";

function Title({ children }: CommonProps) {
    return <H2>{children}</H2>;
}

export default Title;
