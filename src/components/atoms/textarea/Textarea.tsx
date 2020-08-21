import React, { useState, useEffect } from "react";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";

interface TextareaProps extends CommonProps {
    id?: string;
    hei?: string;

    getValue?(value: string, id?: string): void;
}

const StyledTextarea = styled.textarea<TextareaProps>`
    height: ${(props) => props.hei || "70px"};
    resize: none;
`;

function Textarea({ ...props }: TextareaProps) {
    const { getValue } = props;
    const [textareaData, setTextareaData] = useState("");

    useEffect(() => {
        getValue && getValue(textareaData);
    }, [textareaData, getValue]);

    return (
        <StyledTextarea
            {...props}
            id={props.id}
            onChange={({ target: { value } }) => {
                setTextareaData(value);
            }}
            autoFocus
        ></StyledTextarea>
    );
}

export default Textarea;
