import React, { useEffect } from "react";
import { Button } from "../../atoms";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface CreateBtnProps extends CommonProps {
    listbtn?: boolean;
    ChangeMode?: any;
    createHeader?: boolean;
    columnID?: string;
    GetCommentID?: any;
    ChangeComment?: any;
    ModeComment?: any;
    deleteIcon?: boolean;
}

const StyledCreateBtn = styled.div<CreateBtnProps>`
     background: linear-gradient(to left, #f2f2f2 50%, #007cc5 50%);
            background-size: 200% 0%;
            background-position: 100% 100%;
            transition: all ease 0.3s;

            &:hover {
                background-size: 200% 200%;
                background-position: 0% 0%;

                button {
                    color: white;
                }
            }

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

    ${(props) =>
        props.deleteIcon &&
        css`
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 10;

            svg {
                color: #ffffff;
                visibility: hidden;
                opacity: 0;
                cursor: pointer;
                transition: visibility 0s, opacity 100ms linear;
            }
        `}
`;

function CreateBtn({ children, ...props }: CreateBtnProps) {
    const { ChangeMode, GetCommentID, columnID, ChangeComment } = props;

    return (
        <StyledCreateBtn
            {...props}
            onClick={() => {
                {
                    GetCommentID && GetCommentID(columnID);
                }
                {
                    ChangeMode && ChangeMode();
                }
                {
                    ChangeComment && ChangeComment(columnID);
                }
            }}
        >
            <Button>{children}</Button>
        </StyledCreateBtn>
    );
}

export default CreateBtn;
