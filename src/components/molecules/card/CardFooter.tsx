import React from "react";
import { Button } from "../../atoms";
import styled, { css } from "styled-components";
import { CommonProps } from "../../../assets/utils/CommonType";

interface CardFooterProps extends CommonProps {
    create?: boolean;
    modifyList?: boolean;
    menuList?: boolean;
    addComment?: boolean;
    modifyComment?: boolean;

    listID?: string;
    commentDataID?: string;
    columnDataID?: string;

    changeMode?(): void;
    createData?(): void;
    getOneChangeMode?(id?: string): void;
    getOneData2?(id?: string): void;
    editData?(listID?: string, commentID?: string): void;
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

    ${(props) =>
        props.modifyComment &&
        css`
            position: absolute;
            right: 8px;
            bottom: 4px;
            margin: 0;

            button {
                position: static !important;
                opacity: 1 !important;
                padding: 4px 6px !important;
                font-size: 13px;
                visibility: visible !important;
            }
        `}
`;

function CardFooter({ children, ...props }: CardFooterProps) {
    const { createData, editData, changeMode, getOneChangeMode, getOneData2, listID, addComment, commentDataID, columnDataID, create, menuList, modifyComment } = props;

    return (
        <>
            <StyledCardFooter {...props}>
                {create ? (
                    <>
                        <Button modern showTxt btnEvent={createData} getTwoData={editData} listDataID={listID} commentDataID={commentDataID}>
                            생성
                        </Button>
                        <Button modern menuList={menuList} modifyCommentMode={modifyComment} addComment={addComment} showTxt btnEvent={changeMode} columnDataID={columnDataID} commentDataID={commentDataID} getOneData={getOneChangeMode} getOneData2={getOneData2}>
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
