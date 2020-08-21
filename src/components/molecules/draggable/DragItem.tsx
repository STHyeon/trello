import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, Edit as EditIcon } from "@material-ui/icons";
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
    subMenuMode?: boolean;

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
            visibility: visible;
        }

        div {
            border: 1px solid #000000;
        }
    }

    pre {
        position: relative;
        margin: 0 0 8px;
        padding: 16px 8px 30px 8px;
        font-size: 0.8125rem;
        text-align: left;
    }

    button {
        position: absolute;
        top: 5px;
        right: 0;
        padding: 0;
        opacity: 0;
        visibility: hidden;

        svg {
            font-size: 20px;
        }
    }

    span {
        position: absolute;
        left: 8px;
        bottom: 5px;
        font-size: 11px;
        color: #aaaaaa;
    }
`;

const StyledMenu = styled.div<DragItemProps>`
    position: absolute;
    top: 30px;
    right: 0;
    border-radius: 5px;

    background: #ffffff;
    opacity: 0;
    visibility: hidden;

    button {
        position: static;
        padding: 4px 8px;
        border-right: 1px solid #000000;
        vertical-align: middle;

        &:last-child {
            margin: 0;
            border: 0;
        }
    }

    ${(props) =>
        props.subMenuMode
            ? css`
                  opacity: 1;
                  visibility: visible;
              `
            : null}
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

    const [subMenuMode, setSubMenuMode] = useState(false);

    const changeSubMenuMode = (): void => {
        setSubMenuMode(!subMenuMode);
        console.log(subMenuMode);
    };

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
                            <Button btnEvent={changeSubMenuMode}>
                                <ExpandMoreIcon />
                            </Button>
                            {subMenuMode ? (
                                <StyledMenu subMenuMode={subMenuMode}>
                                    <Button getTwoData={existedDropComment} listDataID={listDataID} commentDataID={item._id}>
                                        <DeleteIcon />
                                    </Button>
                                    <Button getTwoData={existedDropComment} listDataID={listDataID} commentDataID={item._id}>
                                        <EditIcon />
                                    </Button>
                                </StyledMenu>
                            ) : null}
                        </>
                    )}
                </Draggable>
            )}
        </StyledDragItem>
    );
}
