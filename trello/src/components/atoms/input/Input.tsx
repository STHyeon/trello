import React, { useState, useEffect } from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";

interface InputProps extends CommonProps {
    id?: string;
    hei?: string;

    getValue?(value: string, id?: string): void;
}

const StyledInput = styled.input<InputProps>`
    height: ${(props) => props.hei || "44px"};
`;

function Input({ ...props }: InputProps) {
    const { getValue } = props;
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
        ></StyledInput>
    );
}

export default Input;
