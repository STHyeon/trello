import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled from "styled-components";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { Button, Span } from "../../atoms";

type ItemData = {
    _id?: string;
    content?: string;
    published_date?: string;
};

interface DragItemProps extends CommonProps {
    item?: ItemData;
    index?: number;
    listDataID?: string;

    existedDropComment?(delListIDs?: string, delCommentIDs?: string): void;
}

const StyledDragItem = styled.div`
    position: relative;

    &:hover {
        pre {
            background: rgb(226, 226, 226);
        }

        button {
            opacity: 1;
        }
    }

    pre {
        position: relative;
        margin: 0 0 8px;
        padding: 16px 20px 30px 16px;
        font-size: 0.8125rem;
        text-align: left;
    }

    button {
        position: absolute;
        top: 5px;
        right: 0;
        padding: 0;
        opacity: 0;

        svg {
            font-size: 20px;
        }
    }

    span {
        position: absolute;
        left: 16px;
        bottom: 5px;
        color: #aaaaaa;
    }
`;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "rgb(133, 107, 167)" : "#ffffff",
    color: isDragging ? "#ffffff" : "#172b4d",

    // styles we need to apply on draggables
    ...draggableStyle,
});

export default function DragItem({ item, index, ...props }: DragItemProps) {
    const { existedDropComment, listDataID } = props;

    return (
        <StyledDragItem>
            {item !== undefined && (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided: any, snapshot: any) => (
                        <>
                            <pre ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                {item.content}
                                <Span>{item.published_date}</Span>
                            </pre>
                            <Button getTwoData={existedDropComment} listDataID={listDataID} commentDataID={item._id}>
                                <DeleteIcon />
                            </Button>
                        </>
                    )}
                </Draggable>
            )}
        </StyledDragItem>
    );
}
