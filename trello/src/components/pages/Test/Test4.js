import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import initialData from "./initial-data";
import List from "./List";

const Container = styled.div`
    display: flex;
`;

class Test4 extends React.Component {
    state = initialData;

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        console.log(result);

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            const changeObject = newTaskIds.find((o) => o.id === draggableId);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, changeObject);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
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

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                    {this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        return <List key={column.id} column={column} />;
                    })}
                </Container>
            </DragDropContext>
        );
    }
}

export default Test4;
