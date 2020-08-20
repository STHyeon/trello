import React from "react";
import Main from "./Main";

export default {
    title: "pages|Main", // 스토리북에서 보여질 그룹과 경로를 명시
    component: Main, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_Main = () => {
    // knobs 만들기
    return <Main />;
};
