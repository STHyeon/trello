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
    newCreateComment?(): void;
    changeCommentMode?(id?: string): void;
    modeComment?: any;
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
                flex-direction: column;

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
                width: 100%;
                height: 100%;
                margin: 0 0 8px;
                padding: 5px;
                background: #ffffff;
            `}
`;

export default function DropZone({ children, ...props }: DropZoneProps) {
    const { changeListMode, changeCommentMode, getValue, newCreateList, newCreateComment, modeComment, columnData, modeList } = props;

    return (
        <StyledDropZone {...props}>
            {columnData ? <Title>{columnData.listTitle}</Title> : <Title>&nbsp;</Title>}
            <div>
                {children ? (
                    <div className="wrap_card children_card">
                        {modeList ? (
                            <StyledDropZone newList>
                                <CardInputBody getValue={getValue}>목록 제목 생성</CardInputBody>
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
                                            <CreateBtn createHeader getOneData={changeCommentMode} columnDataID={columnData._id}>
                                                <CreateIcon />
                                            </CreateBtn>
                                            {modeComment[columnData._id] ? (
                                                <StyledDropZone newComment>
                                                    <CardInputBody getValue={getValue} />
                                                    <CardFooter create createData={newCreateComment} columnDataID={columnData._id} getOneChangeMode={changeCommentMode} />
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
