import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { TextCard, InputCard, CommonTitle } from "../../organisms";
import { Context, CardBox, CommonTemplate } from "../../templates";
import { GET_BOARDS, CREATE_BOARD, BOARD_SUBSCRIPTION, DROP_BOARD } from "../../../assets/utils/Queries";
import "../../../assets/scss/index.scss";

// https://stackoverflow.com/questions/41385059/possible-to-extend-types-in-typescript
// type in type 쓰는 법

type commentType = {
    _id: string;
    content: string;
}

type listType = {
    _id: string;
    listTitle: string;
    taskIds: Array<commentType>
}

type boardType = {
    _id?: string;
    title?: string;
    list?: listType;
};


const StyledDeleteIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    svg {
        color: #ffffff;
        opacity: 0;
        visibility: hidden;
    }
`;

const StyledMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 24%;
    height: 142px;
    margin: 0 5px 10px;
    padding: 8px;
    background: linear-gradient(to left, #ffffff 50%, #03a9f4 50%);
    background-size: 200% 0%;
    background-position: 100% 100%;
    transition: all ease 200ms;
    box-shadow: 1px 1px 2px 0px rgba(128, 128, 128, 1);

    a {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-size: 200% 200%;
        background-position: 0% 0%;

        button,
        span {
            color: #ffffff;
        }

        svg {
            opacity: 1;
            visibility: visible;
        }
    }
`;

function Main() {
    const { loading: allListLoading, error: allListError, data: allListData } = useQuery(GET_BOARDS);
    const [createBoard, { loading: createListLoading, error: createListError }] = useMutation(CREATE_BOARD);
    const [dropBoard, { loading: dropBoardLoading, error: dropBoardError }] = useMutation(DROP_BOARD);
    const { error: allListLiveError, data: allListLiveData } = useSubscription(BOARD_SUBSCRIPTION);

    const [modeBoard, setModeBoard] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [delID, setDelID] = useState("");

    
    useEffect(() => {
        if (allListLiveData) {
            if (delID) {
                // console.log(allListData.allBoard);
                // var a = allListData.allBoard.map((e: boardType) => {
                //     return e._id
                // }).indexOf(delID);

                // if(a >-1) {
                //     // allListData.allBoard.push("A")
                //     allListData.allBoard.slice("2");

                // }
                // console.log(allListData.allBoard);
                // setDelID("");
            } else {
                allListData.allBoard.push(allListLiveData.newBoard);
            }
        }
    }, [allListLiveData]);

    const getBoardName = (value: string): void => {
        setBoardName(value);
    };

    const newCreateBoard = (): void => {
        if (boardName.length > 0) {
            createBoard({ variables: { title: boardName } });
        }

        setBoardName("");
        setModeBoard(false);
    };

    const changeMode = (): void => {
        setModeBoard(!modeBoard);
    };

    const existedDropBoard = (id?: string): void => {
        dropBoard({ variables: { id: id } });
        {
            id && setDelID(id);
        }
    };

    if (allListLoading) return <p>All List Loading...</p>;
    if (allListError) return <p>All List Error!</p>;

    if (createListLoading) return <p>Create List Loading...</p>;
    if (createListError) return <p>Create List Error!</p>;

    if (dropBoardLoading) return <p>Drop Board Loading...</p>;
    if (dropBoardError) return <p>Drop Board Error!</p>;

    if (allListLiveError) return <p>All List Live Error!</p>;

    return (
        <CommonTemplate>
            <CommonTitle startTitle>프로젝트 목록</CommonTitle>
            <CardBox>
                {allListData.allBoard.map((dataBoard: boardType, code: number) => (
                    <StyledMain key={code}>
                        <StyledDeleteIcon onClick={() => existedDropBoard(dataBoard._id)}>
                            <DeleteIcon />
                        </StyledDeleteIcon>
                        <Link to={`/board/${dataBoard._id}`}>
                            <TextCard startCard>{dataBoard.title}</TextCard>
                        </Link>
                    </StyledMain>
                ))}
                <StyledMain>
                    <InputCard startCard modeBoard={modeBoard} changeMode={changeMode} getValue={getBoardName} createBoard={newCreateBoard}>
                        Create New Board
                    </InputCard>
                </StyledMain>
            </CardBox>
        </CommonTemplate>
    );
}

export default Main;
