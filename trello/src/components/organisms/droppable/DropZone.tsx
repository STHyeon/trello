import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragItem, Title, CreateBtn, CardInputBody, CardTextareaBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";
import { Create as CreateIcon, MoreHoriz as MoreHorizIcon } from "@material-ui/icons";

type CommentColumndata = {
    _id?: string;
    content?: string;
};

interface ListColumnData {
    _id: string;
    listTitle?: string;
    taskIds: Array<CommentColumndata>; // 배열일 때 Array 쓰기
}

interface DropZoneProps extends CommonProps {
    board?: boolean;
    modeList?: boolean;
    newComment?: boolean;
    newList?: boolean;
    dropZoneHeader?: boolean;

    columnData?: ListColumnData;

    changeListMode?(): void;
    newCreateList?(): void;
    newCreateComment?(): void;
    newCreateComment?(): void;
    existedDropList?(): void;
    getValue?(value: string, id?: any): void;
    getListID?(value?: string): void;
    existedDropComment?(delListIDs?: string, delCommentIDs?: string): void;
    changeCommentMode?(id?: string): void;
    modeComment?: any;
}

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#e4ccff" : "#ebecf0",
});

const StyledDropZoneheader = styled.div<DropZoneProps>`
    height: 40px;
    padding: 0 8px;
    border-radius: 10px 10px 0 0;
    font-size: 20px;
    background: #aeb4cf;

    ${(props) =>
        props.dropZoneHeader &&
        css`
            display: flex;
            justify-content: space-between;
            align-items: center;

            h2 {
                color: #ffffff;
            }

            button {
                padding: 0;
            }
        `}
`;

const StyledDropZone = styled.div<DropZoneProps>`
    position: relative;
    ul{
        position: absolute;
        top: -10px;
        right: -10px;
        min-width: 200px;
        padding: 8px;
        text-align: left;
        background: #ffffff;
        border: 1px solid #464b5e;

        li {
            cursor: pointer;
        }
    }

    ${(props) =>
        props.board &&
        css`
            text-align: center;

            & + & {
                margin: 0 0 0 10px;
            }

            .wrap_card {
                display: flex;
                position: relative;
                width: 250px;
                padding: 10px 8px;
                background: #ebecf0;
                justify-content: center;
                align-self: center;
                flex-direction: column;

                &.children_card {
                    padding: 8px;
                }
            }
        `}

    ${(props) =>
        props.newComment &&
        css`
            margin: 0 0 8px;
            padding: 5px;
            background: #ffffff;
        `}

        ${(props) =>
            props.newList &&
            css`
                width: 100%;
                height: 100%;
                margin: 0 0 8px;
                padding: 5px;
                border-radius: 5px;
                background: #ffffff;
            `}
`;

export default function DropZone({ children, ...props }: DropZoneProps) {
    const { changeListMode, changeCommentMode, getValue, existedDropComment, newCreateList, newCreateComment, getListID, existedDropList, modeComment, columnData, modeList } = props;
    const [moreMenu, setMoreMenu] = useState(false);

    const changeMoreMenu = (): void => {
        setMoreMenu(!moreMenu);
    };

    return (
        <StyledDropZone {...props}>
            {columnData ? (
                <StyledDropZoneheader dropZoneHeader>
                    <Title>{columnData.listTitle}</Title>
                    <CreateBtn changeMode={changeMoreMenu} getOneData={getListID} columnDataID={columnData._id}>
                        <MoreHorizIcon />
                    </CreateBtn>
                </StyledDropZoneheader>
            ) : (
                <StyledDropZoneheader dropZoneHeader>{modeList ? <Title>리스트 생성</Title> : <Title>&nbsp;</Title>}</StyledDropZoneheader>
            )}
            <div>
                {children ? (
                    <div className="wrap_card children_card">
                        {modeList ? (
                            <StyledDropZone newList>
                                <CardInputBody getValue={getValue} />
                                <CardFooter create createData={newCreateList} changeMode={changeListMode} />
                            </StyledDropZone>
                        ) : (
                            <CreateBtn listBtn changeMode={changeListMode}>
                                {children}
                            </CreateBtn>
                        )}
                    </div>
                ) : (
                    <>
                        {columnData ? (
                            <StyledDropZone>
                                <Droppable droppableId={columnData._id} key={columnData._id}>
                                    {(provided: any, snapshot: any) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="wrap_card">
                                            {modeComment[columnData._id] ? (
                                                <StyledDropZone newComment>
                                                    <CardTextareaBody getValue={getValue} />
                                                    <CardFooter create createData={newCreateComment} columnDataID={columnData._id} getOneChangeMode={changeCommentMode} getOneData2={getListID} />
                                                </StyledDropZone>
                                            ) : null}
                                            {columnData.taskIds.map((item: any, index: any) => (
                                                <DragItem item={item} key={index} index={index} existedDropComment={existedDropComment} listDataID={columnData._id} />
                                            ))}
                                            {provided.placeholder}
                                            <CreateBtn createHeader getOneData={changeCommentMode} getOneData2={getListID} columnDataID={columnData._id}>
                                                <CreateIcon /> Add Card
                                            </CreateBtn>
                                        </div>
                                    )}
                                </Droppable>
                                {moreMenu ? (
                                    <ul>
                                        <li
                                            onClick={() => {
                                                existedDropList && existedDropList();
                                            }}
                                        >
                                            삭제하기
                                        </li>
                                    </ul>
                                ) : null}
                            </StyledDropZone>
                        ) : null}
                    </>
                )}
            </div>
        </StyledDropZone>
    );
}
