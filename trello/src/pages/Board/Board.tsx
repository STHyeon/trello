import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { CommonTemplate, TextCard } from "../../components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// 더미 데이터
const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
    const custom: any = {
        id: `id-${k}`,
        content: `Quote ${k}`,
    };

    return custom;
});

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

// 결과 재정렬을 돕는 함수
const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function Quote({ quote, index }: any) {
    return (
        <Draggable draggableId={quote.id} index={index}>
            {(provided) => (
                <TextCard BoardCard={true} dragData={provided}>
                    {quote.content}
                </TextCard>
            )}
        </Draggable>
    );
}

const QuoteList = React.memo(function QuoteList({ quotes }: any) {
    return quotes.map((quote: any, index: number) => <Quote quote={quote} index={index} key={quote.id} />);
});

function Board() {
    const [state, setState] = useState({ quotes: initial });

    function onDragEnd(result: any) {
        // 리스트 밖으로 드랍한 경우
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(state.quotes, result.source.index, result.destination.index);

        setState({ quotes });
    }

    return (
        <CommonTemplate>
            <DragDropContext onDragEnd={onDragEnd}>
                <BoardStyle>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div className="BoardList" ref={provided.innerRef} {...provided.droppableProps}>
                                <QuoteList quotes={state.quotes} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div className="BoardList" ref={provided.innerRef} {...provided.droppableProps}>
                                <QuoteList quotes={state.quotes} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </BoardStyle>
            </DragDropContext>
        </CommonTemplate>
    );
}

export default Board;
