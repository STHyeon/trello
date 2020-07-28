import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";

function H2({ children, ...props }: CommonProps) {
    return <h2>{children}</h2>;
}

export default H2;
