import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    },
    contents: String,
    // comment_date: { type: Date, default: Date.now() },
});

export default mongoose.model("Comment", CommentSchema);
