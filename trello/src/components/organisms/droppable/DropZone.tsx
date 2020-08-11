import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragItem, Title, CreateBtn, CardInputBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";
import { Create as CreateIcon } from "@material-ui/icons";

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

    columnData?: ListColumnData;

    getValue?(value: string, id?: any): void;
    changeListMode?(): void;
    newCreateList?(): void;
    newCreateComment?(): void;
    getCommentID?(value: string): void;
    modeComment?: any;
    newCreateComment?(): void;
}

const getListStyle = (isDraggingOver: any) => ({
    /* background: isDraggingOver ? "lightblue" : "#ebecf0",*/
});

const StyledDropZone = styled.div<DropZoneProps>`
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
                min-height: 100px;
                padding: 40px 8px 0;
                background: #ebecf0;
                justify-content: center;
                align-self: center;
                flex-direction: columnData;

                &.children_card {
                    padding: 8px;
                }

                &:hover div {
                    opacity: 1;
                }
            }

            h2 {
                margin: 0 0 10px;
                font-size: 20px;
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
                margin: 0 0 8px;
                padding: 5px;
                background: #ffffff;
            `}
`;

export default function DropZone({ children, ...props }: DropZoneProps) {
    const { changeListMode, modeList, getValue, newCreateList, getCommentID, newCreateComment, modeComment, columnData } = props;

    return (
        <StyledDropZone {...props}>
            {columnData ? <Title>{columnData.listTitle}</Title> : <Title>&nbsp;</Title>}
            <div>
                {children ? (
                    <div className="wrap_card children_card">
                        {modeList ? (
                            <StyledDropZone newList>
                                <CardInputBody getValue={getValue}>목록 제목 생성</CardInputBody>
                                <CardFooter createData={newCreateList} changeMode={changeListMode} />
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
                                            <CreateBtn createHeader getOneData={getCommentID} columnDataID={columnData._id}>
                                                <CreateIcon />
                                            </CreateBtn>
                                            {modeComment[columnData._id] ? (
                                                <StyledDropZone newComment>
                                                    <CardInputBody getValue={getValue} />
                                                    <CardFooter createData={newCreateComment} columnDataID={columnData._id} />
                                                </StyledDropZone>
                                            ) : null}
                                            {columnData.taskIds.map((item: any, index: any) => (
                                                <DragItem item={item} key={index} index={index} />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </StyledDropZone>
                        ) : null}
                    </>
                )}
            </div>
        </StyledDropZone>
    );
}
