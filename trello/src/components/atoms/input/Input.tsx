import React, { useState, useEffect } from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";

interface InputProps extends CommonProps {
    id?: string;
    hei?: string;
    // getValue(value: string, id?: string): any;
    getValue: any;
}

const StyledInput = styled.input<InputProps>`
    height: ${(props) => props.hei || "44px"};
`;

function Input({ ...props }: InputProps) {
    const [InputData, SetInputData] = useState("");
    const { getValue } = props;

    useEffect(() => {
        getValue(InputData);
    }, [InputData]);

    return (
        <StyledInput
            {...props}
            id={props.id}
            onChange={({ target: { value } }) => {
                SetInputData(value);
            }}
        ></StyledInput>
    );
}

export default Input;
