import React, { useState, useEffect } from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";

interface InputProps extends CommonProps {
    type: string;
    value?: string;
    id?: string;
    hei?: string;
    defaultValue?: string | undefined;
    placeholder?: string;

    getValue?(value: string, id?: string): void;
}

const StyledInput = styled.input<InputProps>`
    height: ${(props) => props.hei || "44px"};
`;

function Input({ ...props }: InputProps) {
    const { placeholder, type, value, defaultValue, getValue } = props;
    const [inputData, setInputData] = useState("");

    useEffect(() => {
        getValue && getValue(inputData);
    }, [inputData, getValue]);

    return (
        <StyledInput
            {...props}
            id={props.id}
            onChange={({ target: { value } }) => {
                setInputData(value);
            }}
            type={type}
            value={value}
            placeholder={placeholder}
            autoFocus
            autoComplete="off"
            defaultValue={defaultValue}
        ></StyledInput>
    );
}

export default Input;
