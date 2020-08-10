import Board from "../models/board";

const BOARD_ADDED = "BOARD_ADDED";
const LIST_ADDED = "LIST_ADDED";
const COMMENT_ADDED = "COMMENT_ADDED";

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

            const result = await Board.create(boardBox);
            pubsub.publish(BOARD_ADDED, {
                newBoard: result,
            });

            return result;
        },

        createLists: async (_, { id, listTitle }, { pubsub }) => {
            const subTitle = { listTitle: listTitle };
            const result = await Board.findByIdAndUpdate({ _id: id }, { $push: { list: subTitle } }, { new: true });
            pubsub.publish(LIST_ADDED, {
                newLists: result,
            });
            return result;
        },

        createComments: async (_, { id1, id2, content }, { pubsub }) => {
            // https://stackoverflow.com/questions/23577123/updating-a-nested-array-with-mongodb
            // nested array 참고 사이트
            const subComment = { content: content };
            const result = await Board.findOneAndUpdate({ _id: id1, "list._id": id2 }, { $push: { "list.$.taskIds": subComment } }, { new: true });
            pubsub.publish(COMMENT_ADDED, {
                newComments: result,
            });

            return result;
        },

        dropBoard: async (_, { id }, { pubsub }) => {
            await Board.findByIdAndRemove({ _id: id }, { new: true });
            const result = await Board.find();
            console.log(result);
            pubsub.publish(BOARD_ADDED, {
                newBoard: result,
            });
            return "SUCCESS";
        },

        dropList: async (_, { Boardid, Listid }) => {
            var dropID = { _id: Listid };
            await Board.updateOne({ _id: Boardid }, { $pull: { list: dropID } }, function (err, post) {
                if (err) return console.log(err);
            });

            return "SUCCESS";
        },
    },

    Subscription: {
        newBoard: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(BOARD_ADDED),
        },
        newLists: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(LIST_ADDED),
        },
        newComments: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(COMMENT_ADDED),
        },
    },
};
