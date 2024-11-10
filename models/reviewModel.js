import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.ObjectId,
            ref: "Products",
            required: true,
        },
        user: {
            type: mongoose.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
        anonymous: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Reviews", reviewSchema);
