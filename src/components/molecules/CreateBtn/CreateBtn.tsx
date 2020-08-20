import React from "react";
import { Button } from "../../atoms";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface CreateBtnProps extends CommonProps {
    columnDataID?: string;
    listBtn?: boolean;
    createHeader?: boolean;
    deleteIcon?: boolean;
    authBtn?: boolean;

    changeMode?(): void;
    justButton?(): void;
    getOneData?(id?: string): void;
    getOneData2?(value?: string): void;
}

const StyledCreateBtn = styled.div<CreateBtnProps>`
    ${(props) =>
        props.listBtn &&
        css`
            display: flex;
            width: 100%;
            justify-content: center;
            align-self: center;
            transition: background 0.4s;

            &:hover {
                background: #ffffff;
            }

            button {
                width: 100%;
                height: 100%;
                font-size: 16px;
                color: #aaaaaa;
            }
        `}

    ${(props) =>
        props.createHeader &&
        css`
            padding: 5px 0 0;
            text-align: left;

            button {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 0;
                font-size: 14px;
                color: #aaaaaa;
                transition: color 0.7s;

                svg {
                    margin: 0 10px 0 0;
                }

                &:hover {
                    color: #0019bf;
                }
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

    ${(props) =>
        props.authBtn &&
        css`
            button {
                padding: 0;
                font-size: 14px;
                color: #1460d0;
            }
        `}
`;

function CreateBtn({ children, ...props }: CreateBtnProps) {
    const { changeMode, getOneData, getOneData2, justButton, columnDataID } = props;

    return (
        <StyledCreateBtn
            {...props}
            onClick={() => {
                getOneData && getOneData(columnDataID);
                getOneData2 && getOneData2(columnDataID);
                changeMode && changeMode();
                justButton && justButton();
            }}
        >
            <Button>{children}</Button>
        </StyledCreateBtn>
    );
}

export default CreateBtn;
