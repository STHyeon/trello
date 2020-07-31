import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragItem, Title, CreateBtn } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";

interface DropZoneProps extends CommonProps {
    column?: any;
    board?: boolean;
}

const getListStyle = (isDraggingOver: any) => ({
    /* background: isDraggingOver ? "lightblue" : "#ebecf0",*/
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
                display: flex;
                width: 250px;
                min-height: 100px;
                padding: 8px;
                background: #ebecf0;
                justify-content: center;
                align-self: center;
                flex-direction: column;
            }

            h2 {
                margin: 0 0 10px;
                font-size: 20px;
            }
        `}
`;

export default function DropZone({ column, children, ...props }: DropZoneProps) {
    return (
        <DropZonStyle {...props}>
            {column ? <Title>{column.listTitle}</Title> : <Title>&nbsp;</Title>}
            <div>
                {children ? (
                    <div className="wrap_card">
                        <CreateBtn listbtn>{children}</CreateBtn>
                    </div>
                ) : (
                    <Droppable droppableId={column._id} key={column._id}>
                        {(provided: any, snapshot: any) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="wrap_card">
                                {column.taskIds.map((item: any, index: any) => (
                                    <DragItem item={item} key={index} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </div>
        </DropZonStyle>
    );
}
