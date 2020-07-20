import React from "react";
import CardBox from "./CardBox";

export default {
    title: "template|CardBox", // 스토리북에서 보여질 그룹과 경로를 명시
    component: CardBox, // 어떤 컴포넌트를 문서화 할지 명시
};

export const Story_CardBox = () => {
    // knobs 만들기
    return <CardBox />;
};
