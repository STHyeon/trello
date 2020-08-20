import React from "react";
import { Span } from "../../atoms";
import { CommonProps } from "../../../assets/utils/CommonType";

function Text({ children }: CommonProps) {
    return <Span>{children}</Span>;
}

export default Text;
