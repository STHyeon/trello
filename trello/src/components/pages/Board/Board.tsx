import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

import { DropZone } from "../../organisms";
import { CommonTemplate } from "../../templates";
import { GET_DETAIL_BOARD, CREATE_LIST, LIST_SUBSCRIPTION, CREATE_COMMENT, COMMENT_SUBSCRIPTION } from "../../../assets/utils/Queries";

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
    const [modeComment, setModeComment] = useState({});
    const [listData, setListData] = useState<getListType | undefined | any>();
    const [listName, setListName] = useState("");
    const [comments, setComments] = useState("");
    const [listID, setListID] = useState("");

    const { loading: getListLoading, error: getListError, data: getListData } = useQuery(GET_DETAIL_BOARD, { variables: { _id: boardID } });
    const [createLists, { loading: createListLoading, error: createListError }] = useMutation(CREATE_LIST);
    const [createComments, { loading: createCommentLoading, error: createCommentError }] = useMutation(CREATE_COMMENT);
    const { error: getListLiveError, data: getListLiveData } = useSubscription(LIST_SUBSCRIPTION);
    const { error: getCommentLiveError } = useSubscription(COMMENT_SUBSCRIPTION);

    useEffect(() => {
        if (getListLiveData) {
            setListData(getListLiveData.newLists);
        }
    }, [getListLiveData]);

    useEffect(() => {
        if (getListData) {
            getListData.getBoard.map((obj: getListType) => {
                setListData(obj);
            });
        }
    }, [getListData]);

    if (getListLoading) return <p>Get List Loading...</p>;
    if (getListError) return <p>Get List Error</p>;

    if (createListLoading) return <p>Create List Loading...</p>;
    if (createListError) return <p>Create List Error</p>;

    if (createCommentLoading) return <p>Create Comment Loading...</p>;
    if (createCommentError) return <p>Create Comment Error</p>;

    if (getListLiveError) return <p>Get List Live Error</p>;

    if (getCommentLiveError) return <p>Get Comment Live Error</p>;

    const changeListMode = (): void => {
        setModeList(!modeList);
    };

    const changeCommentMode = (id: string): void => {
        setModeComment((prev: any) => ({
            ...prev,
            [id]: !prev[id],
        }));
        setListID(id);
    };

    const getListName = (value: string): void => {
        setListName(value);
    };

    const getComment = (value: string): void => {
        setComments(value);
    };

    const newCreateList = (): void => {
        if (listName.length > 0) {
            createLists({ variables: { id: boardID, listTitle: listName } });
        }

        setListName("");
        setModeList(false);
    };

    const newCreateComment = (): void => {
        if (comments.length > 0) {
            createComments({ variables: { id1: boardID, id2: listID, content: comments } });
        }

        setComments("");
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
    };

    return (
        <CommonTemplate>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledBoard>
                    {listData
                        ? listData.list.map((columnData: listType) => {
                              return <DropZone board key={columnData._id} columnData={columnData} getValue={getComment} newCreateComment={newCreateComment} modeComment={modeComment} changeCommentMode={changeCommentMode} />;
                          })
                        : null}

                    <DropZone board modeList={modeList} changeListMode={changeListMode} getValue={getListName} newCreateList={newCreateList}>
                        생성
                    </DropZone>
                </StyledBoard>
            </DragDropContext>
        </CommonTemplate>
    );
}

export default BoardPage;
