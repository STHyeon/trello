import React from "react";
import { Button } from "../../atoms";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardFooterProps extends CommonProps {
    create?: boolean;
    modifyList?: boolean;
    columnDataID?: string;

    changeMode?(): void;
    createData?(): void;
    getOneChangeMode?(id?: string): void;
    getOneData2?(id?: string): void;
}

const StyledCardFooter = styled.div<CardFooterProps>`
    margin: 10px 0 0;
    text-align: right;

    ${(props) =>
        props.modifyList &&
        css`
            margin: 0;

            button {
                padding: 2px 3px !important;
                font-size: 13px;
                border-color: #ffffff;
                color: #ffffff !important;

                &:hover {
                    background: #03a9f4;
                }
            }
        `}
`;

function CardFooter({ children, ...props }: CardFooterProps) {
    const { createData, changeMode, getOneChangeMode, getOneData2, columnDataID, create } = props;

    return (
        <>
            <StyledCardFooter {...props}>
                {create ? (
                    <>
                        <Button modern showTxt btnEvent={createData}>
                            생성
                        </Button>
                        <Button modern showTxt btnEvent={changeMode} columnDataID={columnDataID} getOneData={getOneChangeMode} getOneData2={getOneData2}>
                            취소
                        </Button>
                    </>
                ) : (
                    <Button modern>{children}</Button>
                )}
            </StyledCardFooter>
        </>
    );
}
export default CardFooter;
