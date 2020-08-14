const { gql } = require("apollo-server");

// 느낌표(!) = null값이 아닌 값을 반환할 것을 기대함
// null 발생 시 오류

export const typeDefs = gql`
    type comments {
        _id: ID
        content: String
    }

    type lists {
        _id: ID
        listTitle: String
        taskIds: [comments]
    }

    type board {
        _id: ID
        title: String
        list: [lists]
    }

    input inputComments {
        _id: ID
        content: String
    }

    input inputList {
        _id: ID
        listTitle: String
        taskIds: [inputComments]
    }

    input inputListAll {
        list: [inputList]
    }

    type Query {
        allBoard: [board]
        getBoard(_id: ID!): [board]
    }

    type Mutation {
        createBoard(title: String): board
        createLists(id: String, listTitle: String): lists
        createComments(boardID: String, listID: String, content: String): board
        dropBoard(boardID: String): String
        dropList(boardID: String, listID: String): String
        dropComment(boardID: String, listID: String, commentID: String): String
        changePosition(boardID: String, ListAll: inputListAll): String
    }

    type Subscription {
        newBoard: board
        newLists: board
    }
`;
