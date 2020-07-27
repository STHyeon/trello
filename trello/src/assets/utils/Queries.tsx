import gql from "graphql-tag";

export const GET_BOARDS = gql`
    query {
        allBoard {
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
        createBoard(title: $title) {
            title
        }
    }
`;
