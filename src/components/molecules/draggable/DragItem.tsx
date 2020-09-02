import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, Edit as EditIcon } from "@material-ui/icons";

import { CommonProps } from "../../../assets/utils/CommonType";
import { CardTextareaBody, CardFooter } from "../../molecules";
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

    modeManage?: any;

    getTwoData?(listID?: string, commentID?: string): void;
    existedDropComment?(delListIDs?: string, delCommentIDs?: string): void;
    changeModeManage?(id?: string): void;
    getValue?(data?: string): void;
}

const StyledDragItem = styled.div`
    position: relative;

    &:hover {
        .wrap_pre {
            border: 1px solid #817fa3;
            background: rgb(226, 226, 226);
        }

        .subMenu {
            border: 1px solid #bdaaaa;
        }

        button {
            opacity: 1;
            visibility: visible;
        }
    }

    .wrap_pre {
        position: relative;
        margin: 0 0 8px;
        padding: 16px 8px 30px 8px;

        pre {
            font-size: 0.8125rem;
            text-align: left;
        }
    }

    button {
        position: absolute;
        top: 5px;
        right: 0;
        padding: 0;
        opacity: 0;
        visibility: hidden;

        svg {
            font-size: 16px;
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
        border-right: 1px solid #bdaaaa;
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
    const { existedDropComment, changeModeManage, getValue, getTwoData, modeManage, listDataID } = props;

    const [subMenuMode, setSubMenuMode] = useState(false);

    const changeSubMenuMode = (): void => {
        setSubMenuMode(!subMenuMode);
    };

    return (
        <StyledDragItem>
            {item !== undefined && (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided: any, snapshot: any) => (
                        <>
                            {item._id && modeManage[item._id + "modifyCommentMode"] ? (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} className="wrap_pre">
                                    <CardTextareaBody defaultValue={item.content} getValue={getValue} />
                                    <CardFooter create modifyComment commentDataID={item._id} listID={listDataID} getOneChangeMode={changeModeManage} editData={getTwoData} />
                                </div>
                            ) : (
                                <>
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} className="wrap_pre">
                                        <pre>
                                            {item.content}
                                            <Span>{item.published_date}</Span>
                                        </pre>
                                    </div>
                                    <Button btnEvent={changeSubMenuMode}>
                                        <ExpandMoreIcon />
                                    </Button>
                                    {subMenuMode ? (
                                        <StyledMenu subMenuMode={subMenuMode} className="subMenu">
                                            <Button commentDataID={item._id} getTwoData={existedDropComment} listDataID={listDataID}>
                                                <DeleteIcon />
                                            </Button>
                                            <Button commentDataID={item._id} modifyCommentMode getOneData={changeModeManage}>
                                                <EditIcon />
                                            </Button>
                                        </StyledMenu>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </Draggable>
            )}
        </StyledDragItem>
    );
}
