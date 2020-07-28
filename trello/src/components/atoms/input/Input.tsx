import React, { useState, useEffect } from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";

interface InputProps extends CommonProps {
    id?: string;
    hei?: string;
    Change?: any;
}

const InputStyle = styled.input<InputProps>`
    height: ${(props) => props.hei || "44px"};
`;

function Input({ ...props }: InputProps) {
    const [InputData, SetInputData] = useState("");
    const { Change } = props;

    useEffect(() => {
        Change(InputData);
    }, [InputData]);

    return (
        <InputStyle
            {...props}
            id={props.id}
            onChange={({ target: { value } }) => {
                SetInputData(value);
            }}
        ></InputStyle>
    );
}

export default Input;
