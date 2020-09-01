import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

import { DropZone } from "../../organisms";
import { CommonTemplate, CommonLoading, CommonError } from "../../context";
import { GET_DETAIL_BOARD, CREATE_LIST, LIST_SUBSCRIPTION, CREATE_COMMENT, DROP_LIST, DROP_COMMENT, CHANGE_POSITION, MODIFY_LISTNAME, MODIFY_COMMENT } from "../../../assets/utils/Queries";

type commentType = {
    _id?: string;
    content?: string;
};

type listType = {
    _id: string;
    listTitle: string;
    taskIds: Array<commentType>;
};

interface getListType {
    list: Array<listType>;
}

interface BoardProps {
    history: any;
    location: any;
    match: any;
    staticContext: any;
}

const StyledBoard = styled.div`
    display: flex;

    .BoardList {
        width: 272px;
        padding: 10px;
        border-radius: 10px;
        background: #ebecf0;

        & + .BoardList {
            margin: 0 0 0 10px;
        }
    }
`;

function BoardPage(props: BoardProps) {
    const boardID = props.match.params.id;
    const [modeList, setModeList] = useState(false);
    // https://stackoverflow.com/questions/54853444/how-to-show-hide-an-item-of-array-map
    // 리스트 마다 각각의 toggle 설정방법
    const [listData, setListData] = useState<getListType | undefined | any>();
    const [listName, setListName] = useState("");
    const [comments, setComments] = useState("");
    const [listID, setListID] = useState("");
    const [cookies] = useCookies(["user"]);
    const [modeManage, setModeManage] = useState({});
    const [modifyMode, setModifyMode] = useState(false);

    const { loading: getListLoading, error: getListError, data: getListData } = useQuery(GET_DETAIL_BOARD, { variables: { _id: boardID } });
    const [createLists, { loading: createListLoading, error: createListError }] = useMutation(CREATE_LIST);
    const [createComments, { loading: createCommentLoading, error: createCommentError }] = useMutation(CREATE_COMMENT);
    const [dropList, { loading: dropListLoading, error: dropListError }] = useMutation(DROP_LIST);
    const [dropComment, { loading: dropCommentLoading, error: dropCommentError }] = useMutation(DROP_COMMENT);
    const [changePosition, { loading: changePositionLoading, error: changePositionError }] = useMutation(CHANGE_POSITION);
    const [modifyList, { loading: modifyListLoading, error: modifyListError }] = useMutation(MODIFY_LISTNAME);
    const [modifyComment, { loading: modifyCommentLoading, error: modifyCommentError }] = useMutation(MODIFY_COMMENT);
    const { error: getListLiveError, data: getListLiveData } = useSubscription(LIST_SUBSCRIPTION);

    useEffect(() => {
        if (getListLiveData) {
            setListData(getListLiveData.newLists);
        }
    }, [getListLiveData]);

    useEffect(() => {
        if (getListData) {
            getListData.getBoard.map((obj: getListType) => setListData(obj));
        }
    }, [getListData]);

    if (getListLoading) return <CommonLoading>Get List</CommonLoading>;
    if (getListError) return <CommonError>{getListError.message}</CommonError>;

    // if (createListLoading) return <CommonLoading>Create List</CommonLoading>;
    if (createListLoading) {
    }
    if (createListError) return <CommonError>{createListError.message}</CommonError>;

    // if (createCommentLoading) return <CommonLoading>Create Comment</CommonLoading>;
    if (createCommentLoading) {
    }
    if (createCommentError) return <CommonError>{createCommentError.message}</CommonError>;

    // if (dropListLoading) return <CommonLoading>Drop List</CommonLoading>;
    if (dropListLoading) {
    }
    if (dropListError) return <CommonError>{dropListError.message}</CommonError>;

    // if (dropCommentLoading) return <CommonLoading>Drop Comment</CommonLoading>;
    if (dropCommentLoading) {
    }
    if (dropCommentError) return <CommonError>{dropCommentError.message}</CommonError>;

    // if (changePositionLoading) return <CommonLoading>Change Position</CommonLoading>;
    if (changePositionLoading) {
    }
    if (changePositionError) return <CommonError>{changePositionError.message}</CommonError>;

    if (modifyListLoading) {
    }
    if (modifyListError) return <CommonError>{modifyListError.message}</CommonError>;

    if (modifyCommentLoading) {
    }
    if (modifyCommentError) return <CommonError>{modifyCommentError.message}</CommonError>;

    if (getListLiveError) return <CommonError>{getListLiveError.message}</CommonError>;

    const changeListMode = (): void => {
        setModeList(!modeList);
    };

    const changeModeManage = (id: string): void => {
        setModeManage((prev: any) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getListID = (value: string): void => {
        setListID(value);
    };

    const existedDropComment = (delListIDs: string, delCommentIDs: string): void => {
        dropComment({ variables: { boardID: boardID, listID: delListIDs, commentID: delCommentIDs } });
    };

    const getListName = (value: string): void => {
        setListName(value);
    };

    const getComment = (value: string): void => {
        setComments(value);
    };

    const newCreateList = (): void => {
        if (listName.length > 0) {
            createLists({ variables: { id: boardID, listTitle: listName, author: cookies.user.user._id } });

            setListName("");
            setModeList(false);
        }
    };

    const newCreateComment = (): void => {
        if (comments.length > 0) {
            createComments({ variables: { boardID: boardID, listID: listID, content: comments, author: cookies.user.user._id } })
                .then(() => {
                    setComments("");
                })
                .catch(() => {});
        }
    };

    const newChangeCommentPosition = (): void => {
        changePosition({ variables: { boardID: boardID, ListAll: listData } });
    };

    const modifyListName = (): void => {
        if (listName.length > 0) {
            modifyList({ variables: { boardID: boardID, listID: listID, listTitle: listName } })
                .then(() => {
                    setListName("");
                    setModifyMode(false);
                })
                .catch(() => {});
        }
    };

    const modifyCommentContent = (editListID: string, editCommentID: string): void => {
        if (comments.length > 0) {
            modifyComment({ variables: { boardID: boardID, listID: editListID, commentID: editCommentID, content: comments } })
                .then(() => {
                    changeModeManage(editCommentID + "modifyCommentMode");
                    setComments("");
                })
                .catch(() => {});
        }
    };

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = listData.list.find((startId: listType) => startId._id === source.droppableId);
        const finish = listData.list.find((finishId: listType) => finishId._id === destination.droppableId);

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            const changeObject = newTaskIds.find((o: commentType | any) => o._id === draggableId);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, changeObject);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
            // Object.assign({}, obj, newColumn)
            // Object 덮어쓰기 deep merge

            const newState = listData.list.map((item: listType) => (item._id === source.droppableId ? Object.assign(item, newColumn) : item));

            setListData({ list: newState });
            newChangeCommentPosition();
            return;
        }

        // 다른 목록 이동시
        const startTaskIds = Array.from(start.taskIds);
        const changeObject = startTaskIds.find((o: commentType | any) => o._id === draggableId);

        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);

        finishTaskIds.splice(destination.index, 0, changeObject);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        listData.list.map((item: listType) => (item._id === source.droppableId ? Object.assign(item, newStart) : item));
        const newState2 = listData.list.map((item: listType) => (item._id === destination.droppableId ? Object.assign(item, newFinish) : item));
        setListData({ list: newState2 });
        newChangeCommentPosition();
    };

    const existedDropList = (): void => {
        dropList({ variables: { boardID: boardID, listID: listID } });
    };

    return (
        <CommonTemplate>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledBoard>
                    {listData
                        ? listData.list.map((columnData: listType) => {
                              return (
                                  <DropZone
                                      board
                                      key={columnData._id}
                                      columnData={columnData}
                                      modeManage={modeManage}
                                      getValue={getComment}
                                      newCreateComment={newCreateComment}
                                      getListID={getListID}
                                      existedDropComment={existedDropComment}
                                      existedDropList={existedDropList}
                                      modifyListName={modifyListName}
                                      getListName={getListName}
                                      changeModeManage={changeModeManage}
                                      modifyCommentContent={modifyCommentContent}
                                  />
                              );
                          })
                        : null}

                    <DropZone board modeList={modeList} changeListMode={changeListMode} getValue={getListName} newCreateList={newCreateList}>
                        Add List
                    </DropZone>
                </StyledBoard>
            </DragDropContext>
        </CommonTemplate>
    );
}

export default BoardPage;
