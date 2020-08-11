import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { Button } from "../../atoms";

type ItemData = {
    _id?: string;
    content?: string;
};

interface DragItemProps extends CommonProps {
    item?: ItemData;
    index?: number;
}

const StyledDragItem = styled.div`
    div {
        position: relative;
        margin: 0 0 8px;
        padding: 16px 2px;

        &:hover {
            button {
                opacity: 1;
            }
        }

        button {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 0;
            opacity: 1;

            svg {
                font-size: 20px;
            }
        }
    }
`;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#ffffff",

    // styles we need to apply on draggables
    ...draggableStyle,
});

export default function DragItem({ item, index }: DragItemProps) {
    return (
        <StyledDragItem>
            {item !== undefined && (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided: any, snapshot: any) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            {item.content}
                            <Button>
                                <DeleteIcon />
                            </Button>
                        </div>
                    )}
                </Draggable>
            )}
        </StyledDragItem>
    );
}
