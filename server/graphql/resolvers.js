import Board from "../models/board";

const BOARD_ADDED = "BOARD_ADDED";

export const resolvers = {
    Query: {
        allBoard: async () => {
            return await Board.find();
        },

        getBoard: async (_, { _id }) => {
            const result = await Board.find({ $and: [{ _id: _id }] });
            return result;
        },
    },

    Mutation: {
        createBoard: async (_, { title }, { pubsub }) => {
            const boardBox = {
                title,
            };

            await Board.create(boardBox, (err, blog) => {
                if (err) return err;
                pubsub.publish(BOARD_ADDED, { newBoard: boardBox });
            });

            return "SUCCESS";
        },

        createLists: async (_, { id, listTitle }) => {
            var subTitle = { listTitle: listTitle };
            await Board.updateOne({ _id: id }, { $push: { list: subTitle } }, function (err, post) {
                if (err) return console.log("리스트 제목 생성 에러");
            });

            return "SUCCESS";
        },

        createComments: async (_, { id, content }) => {
            // https://stackoverflow.com/questions/23577123/updating-a-nested-array-with-mongodb
            // 참고 사이트
            var subComment = { content: content };
            await Board.updateOne({ "list._id": id }, { $push: { "list.$.taskIds": subComment } }, function (err, post) {
                if (err) return console.log(err);
            });

            return "SUCCESS";
        },
    },

    Subscription: {
        newBoard: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([BOARD_ADDED]),
        },
    },
};
