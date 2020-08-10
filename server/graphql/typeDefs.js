const { gql } = require("apollo-server");

// 느낌표(!) = null값이 아닌 값을 반환할 것을 기대함
// null 발생 시 오류

export const typeDefs = gql`
    type Comments {
        _id: ID
        content: String
    }

    type Lists {
        _id: ID
        listTitle: String
        taskIds: [Comments]
    }

    type Board {
        _id: ID
        title: String
        list: [Lists]
    }

    type Query {
        allBoard: [Board]
        getBoard(_id: ID!): [Board]
    }

    type Mutation {
        createBoard(title: String): Board
        createLists(id: String, listTitle: String): Lists
        createComments(id1: String, id2: String, content: String): Board
        dropBoard(id: String): String
        dropList(Boardid: String, Listid: String): String
    }

    type Subscription {
        newBoard: Board
        newLists: Board
        newComments: Board
    }
`;
