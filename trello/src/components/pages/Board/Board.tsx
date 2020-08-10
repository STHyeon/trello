import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CommonTemplate } from "../../templates";
import { DropZone } from "../../organisms";
import { DragDropContext } from "react-beautiful-dnd";
import { GET_DETAIL_BOARD, CREATE_LIST, LIST_SUBSCRIPTION, CREATE_COMMENT, COMMENT_SUBSCRIPTION } from "../../../assets/utils/Queries";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

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

function BoardPage(props: any) {
    const board_id = props.match.params.id;

    const { loading: BoardLoading, error: BoardError, data } = useQuery(GET_DETAIL_BOARD, {
        variables: { _id: board_id },
    });
    const { error: LiveError, data: LiveData } = useSubscription(LIST_SUBSCRIPTION);
    const { error: liveCommentError } = useSubscription(COMMENT_SUBSCRIPTION);
    const [createLists, { loading: ListLoading, error: ListError }] = useMutation(CREATE_LIST);
    const [CreateComment, { loading: CommentLoading, error: CommentError }] = useMutation(CREATE_COMMENT);

    const [ModeBoard, SetModeBoard] = useState(false);
    // https://stackoverflow.com/questions/54853444/how-to-show-hide-an-item-of-array-map
    // 리스트 마다 각각의 toggle 설정방법
    const [ModeComment, SetModeComment] = useState({});
    const [listData2, setListData2]: any = useState();
    const [ListName, SetListName] = useState("");
    const [Comments, SetComments] = useState("");
    const [ListID, SetListID] = useState("");

    useEffect(() => {
        if (LiveData) {
            setListData2(LiveData.newLists);
        }
    }, [LiveData]);

    useEffect(() => {
        if (data) {
            data.getBoard.map((obj: any) => {
                setListData2(obj);
            });
        }
    }, [data]);

    if (BoardLoading) return <p>Loading...</p>;
    if (BoardError) return <p>리스트 오류</p>;

    if (ListLoading) return <p>Loading...</p>;
    if (ListError) return <p>전송 오류</p>;

    if (CommentLoading) return <p>Loading...</p>;
    if (CommentError) return <p>댓글 오류</p>;

    if (LiveError) return <p>실시간 오류</p>;

    if (liveCommentError) return <p>실시간 댓글 오류</p>;

    const ChangeMode = (): void => {
        SetModeBoard(!ModeBoard);
    };

    const GetList = (value: string): void => {
        SetListName(value);
    };

    const handleListSubmit = (): void => {
        if (ListName.length > 0) {
            createLists({ variables: { id: board_id, listTitle: ListName } });
        }

        SetListName("");
    };

    const ChangeComment = (id: any): void => {
        SetModeComment((prev: any) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const GetComment = (value: string): void => {
        SetComments(value);
    };

    const GetCommentID = (value: string): void => {
        SetListID(value);
    };

    const handleCommentSubmit = (): void => {
        if (Comments.length > 0) {
            CreateComment({ variables: { id1: board_id, id2: ListID, content: Comments } });
        }

        SetComments("");
    };

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start: any = listData2.list.find((startId: any) => startId._id === source.droppableId);
        const finish: any = listData2.list.find((finishId: any) => finishId._id === destination.droppableId);

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            const changeObject: any = newTaskIds.find((o: any) => o._id === draggableId);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, changeObject);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
            // Object.assign({}, obj, newColumn)
            // Object 덮어쓰기 deep merge

            const newState = listData2.list.map((item: any) => (item._id === source.droppableId ? Object.assign(item, newColumn) : item));

            setListData2({ list: newState });
            return;
        }

        // 다른 목록 이동시
        const startTaskIds = Array.from(start.taskIds);
        const changeObject = startTaskIds.find((o: any) => o._id === draggableId);

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

        listData2.list.map((item: any) => (item._id === source.droppableId ? Object.assign(item, newStart) : item));
        const newState2 = listData2.list.map((item: any) => (item._id === destination.droppableId ? Object.assign(item, newFinish) : item));
        setListData2({ list: newState2 });
    };

    return (
        <CommonTemplate>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledBoard>
                    {listData2
                        ? listData2.list.map((columnId: any) => {
                              return <DropZone key={columnId._id} column={columnId} board getValue={GetComment} handleSubmit={handleCommentSubmit} GetCommentID={GetCommentID} ChangeComment={ChangeComment} ModeComment={ModeComment} />;
                          })
                        : null}
                    <DropZone board ModeBoard={ModeBoard} ChangeMode={ChangeMode} getValue={GetList} handleSubmit={handleListSubmit}>
                        생성
                    </DropZone>
                </StyledBoard>
            </DragDropContext>
        </CommonTemplate>
    );
}

export default BoardPage;
