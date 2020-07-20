import React from "react";
import StartCard from "./StartCard";

export default {
    title: "organisms|StartCard", // 스토리북에서 보여질 그룹과 경로를 명시
    component: StartCard, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_StartCard = () => {
    // knobs 만들기
    return <StartCard />;
};
