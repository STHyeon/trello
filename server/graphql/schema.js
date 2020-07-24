import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

// 느낌표(!) = null값이 아닌 값을 반환할 것을 기대함
// null 발생 시 오류

const typeDefs = `
    type Comments {
        _id: ID
        contents: String
    }

    type Board {
        _id: ID
        title: String
    }

    input BoardInput {
        title: String
    }

    input CommentsInput {
        _id: ID
        contents: String
    }

    type Query {
        allBoard: [Board]
    }

    type Mutation {
        createBoard (title: String): Board
        createComments (id: String, contents: String): Comments
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
