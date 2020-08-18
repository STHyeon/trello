// import React, { useState, useEffect } from "react";
// import Loading from "./Loading";

// import styled from "styled-components";
// import { DragDropContext } from "react-beautiful-dnd";
// import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

// import { DropZone } from "../../organisms";
// import { CommonTemplate } from "../../context";
// import { GET_DETAIL_BOARD, CREATE_LIST, LIST_SUBSCRIPTION, CREATE_COMMENT } from "../../../assets/utils/Queries";

// const StyledError = styled.div`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-weight: bold;
//     font-size: 30px;
// `;

// function Test1(props: any) {
//     const boardID = props.match.params.id;
//     const [modeList, setModeList] = useState(false);
//     // https://stackoverflow.com/questions/54853444/how-to-show-hide-an-item-of-array-map
//     // 리스트 마다 각각의 toggle 설정방법
//     const [modeComment, setModeComment] = useState({});
//     const [listData, setListData] = useState(); // 타입 정의 필요
//     const [listName, setListName] = useState("");
//     const [comments, setComments] = useState("");
//     const [listID, setListID] = useState("");

//     const [createLists, { loading: createListLoading, error: createListError }] = useMutation(CREATE_LIST);
//     const [createComments, { loading: createCommentLoading, error: createCommentError }] = useMutation(CREATE_COMMENT);
//     const { loading: getListLiveLoading, error: getListLiveError, data: getListLiveData } = useSubscription(LIST_SUBSCRIPTION);

//     useEffect(() => {
//         if (getListLiveData) {
//             setListData(getListLiveData.newLists);
//         }
//     }, [getListLiveData]);

//     return <StyledError>Error</StyledError>;
// }

import React from "react";

function Test1() {
    return <div>a</div>;
}

export default Test1;
