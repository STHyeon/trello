import React from "react";
import { CommonProps } from "../../../assets/utils/CommonType";

interface InputProps extends CommonProps {
    id?: string;
}

function Input({ ...props }: InputProps) {
    return <input id={props.id} />;
}

export default Input;
