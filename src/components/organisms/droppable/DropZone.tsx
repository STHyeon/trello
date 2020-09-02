import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { DragItem, Title, CreateBtn, CardInputBody, CardTextareaBody, CardFooter } from "../../molecules";
import { CommonProps } from "../../../assets/utils/CommonType";
import styled, { css } from "styled-components";
import { Create as CreateIcon, MoreHoriz as MoreHorizIcon } from "@material-ui/icons";

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
    type?: string;
    board?: boolean;
    modeList?: boolean;
    newComment?: boolean;
    newList?: boolean;
    dropZoneHeader?: boolean;
    modifyMode?: boolean;

    modeManage?: any;

    columnData?: ListColumnData;

    changeListMode?(): void;
    newCreateList?(): void;
    newCreateComment?(): void;
    newCreateComment?(): void;
    existedDropList?(): void;
    modifyListName?(): void;
    changeModifyMode?(): void;
    getValue?(value: string, id?: any): void;
    getListID?(value?: string): void;
    getListName?(value?: string): void;
    existedDropComment?(delListIDs?: string, delCommentIDs?: string): void;
    changeModeManage?(id?: string): void;
    modifyCommentContent?(editListID?: string, editCommentID?: string): void;
}

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#c1c1c1" : "#ebecf0",
});

const StyledDropZoneheader = styled.div<DropZoneProps>`
    height: 40px;
    padding: 0 8px;
    border-radius: 10px 10px 0 0;
    font-size: 20px;
    background: #9a90a8;

    ${(props) =>
        props.dropZoneHeader &&
        css`
            display: flex;
            justify-content: space-between;
            align-items: center;

            h2 {
                color: #ffffff;
            }

            button {
                padding: 0;
            }
        `}
`;

const StyledDropZone = styled.div<DropZoneProps>`
    .wrap_dropzone {
        overflow: scroll;
        position: relative;
        max-height: 91%;
    }

    &.wrap_board {
        max-height: 100%;
    }

    ul {
        position: absolute;
        top: -10px;
        right: -10px;
        min-width: 200px;
        padding: 8px;
        text-align: left;
        background: #ffffff;
        border: 1px solid #464b5e;

        li {
            margin: 0 0 5px;
            padding: 0 0 5px;
            border-bottom: 1px solid #c6c4c8;
            cursor: pointer;

            &:last-child {
                margin: 0;
                padding: 0;
                border: 0;
            }
        }
    }

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
                padding: 10px 8px 0;
                background: #ebecf0;
                justify-content: center;
                align-self: center;
                flex-direction: column;

                &.children_card {
                    padding: 8px;
                }
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
            border-radius: 5px;
            background: #ffffff;
        `}
`;

export default function DropZone({ children, ...props }: DropZoneProps) {
    const { modeManage, columnData, modeList, modifyCommentContent, changeListMode, getValue, existedDropComment, newCreateList, newCreateComment, getListID, existedDropList, modifyListName, getListName, changeModeManage } = props;

    return (
        <StyledDropZone {...props} className="wrap_board">
            {columnData ? (
                // 제목
                <StyledDropZoneheader dropZoneHeader>
                    {modeManage[columnData._id + "listName"] ? (
                        <>
                            <CardInputBody modifyList type="text" getValue={getListName} defaultValue={columnData.listTitle} />
                            <CardFooter create menuList modifyList createData={modifyListName} getOneChangeMode={changeModeManage} columnDataID={columnData._id} />
                        </>
                    ) : (
                        <>
                            <Title>{columnData.listTitle}</Title>
                            <CreateBtn menuList getOneData2={changeModeManage} getOneData={getListID} columnDataID={columnData._id}>
                                <MoreHorizIcon />
                            </CreateBtn>
                        </>
                    )}
                </StyledDropZoneheader>
            ) : (
                <StyledDropZoneheader dropZoneHeader>{modeList ? <Title>리스트 생성</Title> : <Title>&nbsp;</Title>}</StyledDropZoneheader>
            )}
            <>
                {children ? (
                    // 내용 추가 관련 배포
                    <div className="wrap_card children_card">
                        {modeList ? (
                            <StyledDropZone newList>
                                <CardInputBody type="text" getValue={getValue} />
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
                            <div className="wrap_dropzone">
                                <Droppable droppableId={columnData._id} key={columnData._id}>
                                    {(provided: any, snapshot: any) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="wrap_card">
                                            {modeManage[columnData._id + "addComment"] ? (
                                                // 내용추가
                                                <StyledDropZone newComment>
                                                    <CardTextareaBody getValue={getValue} />
                                                    <CardFooter create addComment createData={newCreateComment} columnDataID={columnData._id} getOneChangeMode={changeModeManage} getOneData2={getListID} />
                                                </StyledDropZone>
                                            ) : null}
                                            {columnData.taskIds.map((item: any, index: any) => (
                                                <DragItem item={item} key={index} index={index} modeManage={modeManage} existedDropComment={existedDropComment} listDataID={columnData._id} changeModeManage={changeModeManage} getValue={getValue} getTwoData={modifyCommentContent} />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                {modeManage[columnData._id + "list"] ? (
                                    // 추가 메뉴
                                    <ul>
                                        <li
                                            onClick={() => {
                                                existedDropList && existedDropList();
                                            }}
                                        >
                                            삭제하기
                                        </li>
                                        <li
                                            onClick={() => {
                                                // changeModifyMode && changeModifyMode();
                                                changeModeManage && changeModeManage(columnData._id + "listName");
                                                changeModeManage && changeModeManage(columnData._id + "list");
                                            }}
                                        >
                                            수정하기
                                        </li>
                                    </ul>
                                ) : null}
                            </div>
                        ) : null}
                    </>
                )}
                {columnData ? (
                    <CreateBtn createHeader addComment getOneData={changeModeManage} getOneData2={getListID} columnDataID={columnData._id}>
                        <CreateIcon /> Add Card
                    </CreateBtn>
                ) : null}
            </>
        </StyledDropZone>
    );
}
