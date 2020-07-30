import React, { useState } from "react";
import styled from "styled-components";
import { CommonTemplate } from "../../templates";
import { DropZone } from "../../organisms";
import { DragDropContext } from "react-beautiful-dnd";
import { GET_DETAIL_BOARD, BOARD_SUBSCRIPTION } from "../../../assets/utils/Queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

import initialData from "../Test/initial-data";

const BoardStyle = styled.div`
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

    const { loading: BoardLoading, error: BoardError, data, subscribeToMore } = useQuery(GET_DETAIL_BOARD, {
        variables: { _id: board_id },
    });

    const [listData, setListData] = useState(initialData);

    if (BoardLoading) return <p>Loading...</p>;
    if (BoardError) return <p>Error!</p>;

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start: any = listData.find((startId) => startId.id === source.droppableId);
        const finish: any = listData.find((finishId) => finishId.id === destination.droppableId);

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            const changeObject: any = newTaskIds.find((o: any) => o.id === draggableId);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, changeObject);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
            // Object.assign({}, obj, newColumn)
            // Object 덮어쓰기 deep merge

            const newState = listData.map((item: any) => (item.id === source.droppableId ? Object.assign(item, newColumn) : item));

            setListData(newState);
            return;
        }

        // 다른 목록 이동시
        const startTaskIds = Array.from(start.taskIds);
        const changeObject = startTaskIds.find((o: any) => o.id === draggableId);

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

        listData.map((item: any) => (item.id === source.droppableId ? Object.assign(item, newStart) : item));
        const newState2 = listData.map((item: any) => (item.id === destination.droppableId ? Object.assign(item, newFinish) : item));
        setListData(newState2);
    };

    return (
        <CommonTemplate>
            <DragDropContext onDragEnd={onDragEnd}>
                <BoardStyle>
                    {listData.map((columnId) => {
                        return <DropZone key={columnId.id} column={columnId} board />;
                    })}
                </BoardStyle>
            </DragDropContext>
        </CommonTemplate>
    );
}

export default BoardPage;
