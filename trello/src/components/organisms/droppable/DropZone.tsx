import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragItem, Title } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface DropZoneProps extends CommonProps {
    column?: any;
    board?: boolean;
}

const getListStyle = (isDraggingOver: any) => ({
    /* background: isDraggingOver ? "lightblue" : "#ebecf0",*/
    padding: 8,
    width: 250,
});

const DropZonStyle = styled.div<DropZoneProps>`
    ${(props) =>
        props.board &&
        css`
            text-align: center;

            & + & {
                margin: 0 0 0 10px;
            }

            .wrap_card {
                min-height: 100px;
                background: #ebecf0;
            }

            h2 {
                margin: 0 0 10px;
                font-size: 20px;
            }
        `}
`;

export default function DropZone({ column, ...props }: DropZoneProps) {
    return (
        <DropZonStyle {...props}>
            <Title>{column.title}</Title>
            <div>
                <Droppable droppableId={column.id} key={column.id}>
                    {(provided: any, snapshot: any) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="wrap_card">
                            {column.taskIds.map((item: any, index: any) => (
                                <DragItem item={item} key={index} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DropZonStyle>
    );
}
