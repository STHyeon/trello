import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragItem, Title, CreateBtn, CardInputBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";
import { Create as CreateIcon } from "@material-ui/icons";

interface DropZoneProps extends CommonProps {
    column?: any;
    board?: boolean;
    ModeBoard?: boolean;
    ChangeMode?(): void;
    getValue?(value: string, id?: any): void;
    handleSubmit?(): void;
    newComment?: boolean;
    newList?: boolean;
    GetCommentID?(value: string): void;
    ChangeComment?(id: string): void;
    ModeComment?: any;
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
                margin: 0 0 8px;
                padding: 5px;
                background: #ffffff;
            `}
`;

export default function DropZone({ column, children, ...props }: DropZoneProps) {
    const { ChangeMode, ModeBoard, getValue, handleSubmit, GetCommentID, ChangeComment, ModeComment } = props;

    return (
        <StyledDropZone {...props}>
            {column ? <Title>{column.listTitle}</Title> : <Title>&nbsp;</Title>}
            <div>
                {children ? (
                    <div className="wrap_card children_card">
                        {ModeBoard ? (
                            <StyledDropZone newList>
                                <CardInputBody getValue={getValue}>목록 제목 생성</CardInputBody>
                                <CardFooter handleSubmit={handleSubmit} ChangeMode={ChangeMode} />
                            </StyledDropZone>
                        ) : (
                            <CreateBtn listbtn ChangeMode={ChangeMode}>
                                {children}
                            </CreateBtn>
                        )}
                    </div>
                ) : (
                    <StyledDropZone>
                        <Droppable droppableId={column._id} key={column._id}>
                            {(provided: any, snapshot: any) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="wrap_card">
                                    <CreateBtn createHeader ChangeComment={ChangeComment} GetCommentID={GetCommentID} columnID={column._id}>
                                        <CreateIcon />
                                    </CreateBtn>
                                    {ModeComment[column._id] ? (
                                        <StyledDropZone newComment>
                                            <CardInputBody getValue={getValue} />
                                            <CardFooter handleSubmit={handleSubmit} ChangeComment={ChangeComment} columnID={column._id} />
                                        </StyledDropZone>
                                    ) : null}
                                    {column.taskIds.map((item: any, index: any) => (
                                        <DragItem item={item} key={index} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </StyledDropZone>
                )}
            </div>
        </StyledDropZone>
    );
}
