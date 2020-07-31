import React from "react";
import { Button } from "../../atoms";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface CreateBtnProps extends CommonProps {
    listbtn?: boolean;
}

const CreateBtnStyle = styled.div<CreateBtnProps>`
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
`;

function CreateBtn({ children, ...props }: CreateBtnProps) {
    return (
        <CreateBtnStyle {...props}>
            <Button>{children}</Button>
        </CreateBtnStyle>
    );
}

export default CreateBtn;
