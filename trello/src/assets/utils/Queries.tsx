import gql from "graphql-tag";

export const GET_BOARDS = gql`
    query {
        allBoard {
            _id
            title
        }
    }
`;

export const BOARD_SUBSCRIPTION = gql`
    subscription {
        newBoard {
            title
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation CreateBoard($title: String!) {
        createBoard(title: $title)
    }
`;

export const GET_DETAIL_BOARD = gql`
    query GetBoard($_id: ID!) {
        getBoard(_id: $_id) {
            _id
            title
            list {
                _id
                Today
            }
        }
    }
`;
