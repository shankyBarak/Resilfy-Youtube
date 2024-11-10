import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const ReviewForm = () => {
    const { productId } = useParams(); // Get the product ID from the route
    const navigate = useNavigate();
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1); // Rating out of 5

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/review/add`, {
                productId,
                title: reviewTitle,
                text: reviewText,
                rating,
            });
            if (data.success) {
                toast.success("Review submitted successfully!");
                navigate("/products"); // Redirect to products list after submission
            } else {
                toast.error(data.message || "Failed to submit review");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container">
                <h1>Write a Review</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="reviewTitle" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="reviewTitle"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reviewText" className="form-label">Review</label>
                        <textarea
                            className="form-control"
                            id="reviewText"
                            rows="4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <select
                            className="form-select"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Submit Review</button>
                </form>
            </div>
        </Layout>
    );
};

export default ReviewForm;
