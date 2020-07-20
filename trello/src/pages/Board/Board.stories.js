import React from "react";
import Board from "./Board";

export default {
    title: "pages|Board", // 스토리북에서 보여질 그룹과 경로를 명시
    component: Board, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_Board = () => {
    // knobs 만들기
    return <Board />;
};
