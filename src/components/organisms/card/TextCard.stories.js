import React from "react";
import TextCard from "./TextCard";

export default {
    title: "organisms|TextCard", // 스토리북에서 보여질 그룹과 경로를 명시
    component: TextCard, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_TextCard = () => {
    // knobs 만들기
    return <TextCard />;
};
