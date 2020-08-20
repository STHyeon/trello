import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";

interface H2Props extends CommonProps {}

function H2({ children }: H2Props) {
    return <h2>{children}</h2>;
}

export default H2;
