import React, { useState, useEffect } from "react";
import { StartCard, CommonTemplate, CardBox, CommonTitle } from "../../components";
import "../../assets/scss/index.scss";
import { GET_BOARDS, BOARD_SUBSCRIPTION } from "../../assets/utils/Queries";
import { useQuery } from "@apollo/react-hooks";

function Main() {
    let unsubscribe = null; //publish 했을때 변화
    const { loading, error, data, subscribeToMore } = useQuery(GET_BOARDS);
    // const [boardList, setBoardList] = useState<any>();
    // useEffect(() => {
    //     // setBoardList(data);

    //     if (data) {
    //         setBoardList(data.allBoard);
    //     }
    // }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    if (!unsubscribe) {
        subscribeToMore({
            document: BOARD_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev; // prev 이전 데이터

                const { newBoard } = subscriptionData.data; // 신규 데이터

                return {
                    ...prev,
                    allBoard: [...prev.allBoard, newBoard],
                };
            },
        });
    }

    return (
        <CommonTemplate>
            <CommonTitle start="true">프로젝트 목록</CommonTitle>
            <CardBox>
                {data.allBoard.map((dataBoard: any, code: number) => (
                    <StartCard MainCard key={code} InputMode>
                        {dataBoard.title}
                    </StartCard>
                ))}

                <StartCard MainCard>Create New Board</StartCard>
            </CardBox>
        </CommonTemplate>
    );
}

export default Main;
