import mongoose from "mongoose";

const videoSchmea = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        view: Number,
        rating: Number
    },
});

const Video = mongoose.model("Video", videoSchmea);
export default Video;