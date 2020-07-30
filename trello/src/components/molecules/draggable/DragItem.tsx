import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CommonProps } from "../../../assets/utils/CommonType";

interface DragItemProps extends CommonProps {
    item?: any;
    index?: any;
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 8px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#ffffff",

    // styles we need to apply on draggables
    ...draggableStyle,
});

export default function DragItem({ item, index }: DragItemProps) {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided: any, snapshot: any) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    {item.content}
                </div>
            )}
        </Draggable>
    );
}
