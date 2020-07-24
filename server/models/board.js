import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    title: String,
    comments: [
        {
            so: String,
        },
    ],
    // TODO: [CommentSchema],
});

export default mongoose.model("Board", BoardSchema);
