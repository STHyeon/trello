import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { TextCard, InputCard, CommonTitle } from "../../organisms";
import { Context, CardBox, CommonTemplate } from "../../templates";
import { GET_BOARDS, CREATE_BOARD, BOARD_SUBSCRIPTION } from "../../../assets/utils/Queries";
import "../../../assets/scss/index.scss";

type DataProps = {
    _id?: string;
    title?: string;
};

const StyledDeleteIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
`;

const StyledMain = styled.div`
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

    &:hover {
        background-size: 200% 200%;
        background-position: 0% 0%;

        color: #ffffff;

        svg {
            visibility: visible;
            opacity: 1;
        }
    }
`;

function Main() {
    const { loading: allListLoading, error: allListError, data: allListData } = useQuery(GET_BOARDS);
    const [createBoard, { loading: createListLoading, error: createListError }] = useMutation(CREATE_BOARD);
    const { error: allListLiveError, data: allListLiveData } = useSubscription(BOARD_SUBSCRIPTION);

    const [modeBoard, setModeBoard] = useState(false);
    const [boardName, setBoardName] = useState("");

    useEffect(() => {
        if (allListLiveData) {
            allListData.allBoard.push(allListLiveData.newBoard);
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

    if (allListLoading) return <p>All List Loading...</p>;
    if (allListError) return <p>All List Error!</p>;

    if (createListLoading) return <p>Create List Loading...</p>;
    if (createListError) return <p>Create List Error!</p>;

    if (allListLiveError) return <p>All List Live Error!</p>;

    return (
        <CommonTemplate>
            <CommonTitle startTitle>프로젝트 목록</CommonTitle>
            <CardBox>
                {allListData.allBoard.map((dataBoard: DataProps, code: number) => (
                    <StyledMain key={code}>
                        <Link to={`/board/${dataBoard._id}`}>
                            <TextCard startCard>{dataBoard.title}</TextCard>
                        </Link>
                        <StyledDeleteIcon>
                            <DeleteIcon />
                        </StyledDeleteIcon>
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
