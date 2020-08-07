import React from "react";
import { Button } from "../../atoms";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface CreateBtnProps extends CommonProps {
    listbtn?: boolean;
    ChangeMode?(): void;
    createHeader?: boolean;
}

const StyledCreateBtn = styled.div<CreateBtnProps>`
    ${(props) =>
        props.listbtn &&
        css`
            display: flex;
            width: 100%;
            height: 80px;
            background: #fff;
            justify-content: center;
            align-self: center;

            button {
                width: 100%;
                height: 100%;
                font-size: 20px;
            }
        `}

    ${(props) =>
        props.createHeader &&
        css`
            position: absolute;
            top: 8px;
            right: 8px;
            opacity: 0;
            transition: all 0.5s;

            button {
                padding: 0;
            }
        `}
`;

function CreateBtn({ children, ...props }: CreateBtnProps) {
    const { ChangeMode } = props;
    return (
        <StyledCreateBtn {...props}>
            <Button btnEvent={ChangeMode}>{children}</Button>
        </StyledCreateBtn>
    );
}

export default CreateBtn;
