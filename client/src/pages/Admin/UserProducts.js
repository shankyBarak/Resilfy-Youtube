import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserProducts = () => {
    const [products, setProducts] = useState([]);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            // Filter products where sell is 1
            const filteredProducts = data.products.filter((p) => p.sell === 1);
            setProducts(filteredProducts);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <style>{`
                .products-container {
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .product-card {
                    border: none;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                }
                .product-link {
                    text-decoration: none;
                    color: inherit;
                }
                .product-img {
                    border-radius: 10px 10px 0 0;
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    object-fit: contain;
                }
                .card-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
                .card-text {
                    color: #6c757d;
                }
                .title {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .product-count {
                    font-size: 1.2rem;
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                    font-weight: bold;
                }
            `}</style>

            <div className="row products-container">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="title">All Products List</h1>
                    {/* Dynamic product count */}
                    <p className="product-count">
                        You have {products.length} products to pick up.
                    </p>
                    <div className="row">
                        {products?.map((p) => (
                            <div key={p._id} className="col-md-4 mb-4">
                                <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                    <div className="card product-card" style={{ width: "100%" }}>
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top product-img"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserProducts;
