import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List.js";

// 여러 개 드롭영역 해결법 찾아보기

const column = {
    id: "item-0",
    title: "Column 1",
    items: [
        { id: "item-0", content: "g0i" },
        { id: "item-1", content: "g1i" },
        { id: "item-2", content: "g2i" },
        { id: "item-3", content: "g3i" },
        { id: "item-4", content: "g4i" },
    ],
};

const column2 = [
    {
        id: "item-0",
        title: "Column 0",
        items: [
            { id: "item-0", content: "g0i" },
            { id: "item-1", content: "g1i" },
            { id: "item-2", content: "g2i" },
            { id: "item-3", content: "g3i" },
            { id: "item-4", content: "g4i" },
        ],
    },
    {
        id: "item-1",
        title: "Column 1",
        items: [
            { id: "item-01", content: "a0i" },
            { id: "item-12", content: "a1i" },
            { id: "item-23", content: "a2i" },
            { id: "item-34", content: "a3i" },
            { id: "item-45", content: "a4i" },
        ],
    },
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function Test1() {
    const [items1, setState] = useState(column.items);
    const [test, setTest] = useState(column2);

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(items1, result.source.index, result.destination.index);
        const news = reorder(test, result.source.index, result.destination.index);

        setState(items);
        setTest(news);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <List data={items1} data2={test} />
        </DragDropContext>
    );
}

export default Test1;
