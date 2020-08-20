import React from "react";
import DragAndDropApp from "./DragAndDropApp";

export default {
    title: "pages|DragAndDropApp", // 스토리북에서 보여질 그룹과 경로를 명시
    component: DragAndDropApp, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_DragAndDropApp = () => {
    // knobs 만들기
    return <DragAndDropApp />;
};
