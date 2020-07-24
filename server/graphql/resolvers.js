import Board from "../models/board";
import Comment from "../models/comments";

export const resolvers = {
    Query: {
        async allBoard() {
            return await Board.find();
        },
    },
    Mutation: {
        createBoard: async (_, { title }) => {
            console.log(title);
            return await Board.create({ title });
        },

        createComments: async (_, { id, contents }) => {
            console.log(contents);
            var z = { so: contents };
            var a = Board.updateOne({ _id: id }, { $push: { comments: z } }, function (err, post) {
                if (err) return console.log("에로");
            });

            return await a;
        },
    },
};
