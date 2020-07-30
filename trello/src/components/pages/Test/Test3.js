import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import initialData from "./initial-data";
import List from "./List";

const Container = styled.div`
    display: flex;
`;

function Test3() {
    const [state, setState] = useState(initialData);

    const onDragEnd = (result) => {
        console.log(state);
        const { destination, source, draggableId } = result;
        console.log(result);

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = state.find((startId) => startId.id === source.droppableId);
        const finish = state.find((finishId) => finishId.id === destination.droppableId);

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            const changeObject = newTaskIds.find((o) => o.id === draggableId);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, changeObject);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
            // Object.assign({}, obj, newColumn)
            // Object 덮어쓰기 deep merge

            const newState = state.map((item) => (item.id === source.droppableId ? Object.assign(item, newColumn) : item));

            setState(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        const changeObject = startTaskIds.find((o) => o.id === draggableId);

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

        state.map((item) => (item.id === source.droppableId ? Object.assign(item, newStart) : item));
        const newState2 = state.map((item) => (item.id === destination.droppableId ? Object.assign(item, newFinish) : item));
        setState(newState2);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                {state.map((columnId) => {
                    return <List key={columnId.id} column={columnId} />;
                })}
            </Container>
        </DragDropContext>
    );
}

export default Test3;
