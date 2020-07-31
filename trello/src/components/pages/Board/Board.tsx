import React, { useState, useEffect } from "react";
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

    const [listData2, setListData2]: any = useState();

    useEffect(() => {
        if (data) {
            data.getBoard.map((obj: any) => {
                setListData2(obj);
            });
        }
    }, [data]);

    if (BoardLoading) return <p>Loading...</p>;

    // if (BoardError) return console.log(BoardError);

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
                <BoardStyle>
                    {listData2
                        ? listData2.list.map((columnId: any) => {
                              return <DropZone key={columnId._id} column={columnId} board />;
                          })
                        : console.log("없음")}
                    <DropZone board>생성</DropZone>
                </BoardStyle>
            </DragDropContext>
        </CommonTemplate>
    );
}

export default BoardPage;
