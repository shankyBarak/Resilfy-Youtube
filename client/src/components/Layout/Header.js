import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    backgroundColor: '#e2f1e2',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    padding: '10px 20px',
                    position: 'relative',
                }}
            >
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link
                            to="/"
                            className="navbar-brand"
                            style={{
                                fontWeight: '600',
                                fontSize: '1.5rem',  // Decreased font size
                                color: '#2e3d49',
                                fontFamily: "'Montserrat', sans-serif",
                                letterSpacing: '1px',
                                transition: 'color 0.3s ease, transform 0.2s ease',
                                position: 'relative',
                                top: '-5px', // Shifted upward slightly
                            }}
                        >
                            Reselify
                        </Link>
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0" style={{ gap: '30px' }}>
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link"
                                    style={{
                                        fontSize: '1.1rem',
                                        color: '#333',
                                        padding: '10px 15px',
                                        transition: 'color 0.3s ease, transform 0.2s ease',
                                    }}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    data-bs-toggle="dropdown"
                                    style={{
                                        fontSize: '1.1rem',
                                        color: '#333',
                                        transition: 'color 0.3s ease, transform 0.2s ease',
                                    }}
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li key={c._id}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item search-container">
                                <SearchInput />
                            </li>
                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/register"
                                            className="nav-link"
                                            style={{
                                                fontSize: '1.1rem',
                                                color: '#333',
                                                transition: 'color 0.3s ease, transform 0.2s ease',
                                            }}
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/login"
                                            className="nav-link"
                                            style={{
                                                fontSize: '1.1rem',
                                                color: '#333',
                                                transition: 'color 0.3s ease, transform 0.2s ease',
                                            }}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{
                                                fontSize: '1.1rem',
                                                color: '#333',
                                                transition: 'color 0.3s ease, transform 0.2s ease',
                                            }}
                                        >
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                        }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink
                                        to="/cart"
                                        className="nav-link"
                                        style={{
                                            fontSize: '1.1rem',
                                            color: '#333',
                                            transition: 'color 0.3s ease, transform 0.2s ease',
                                        }}
                                    >
                                        Cart
                                    </NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <style jsx>{`
                .navbar-nav .nav-link:hover,
                .navbar-brand:hover {
                    color: #4CAF50;
                    transform: scale(1.05);
                }
                .navbar-nav {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 30px;
                }
                .search-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 350px;
                }
                .search-container input {
                    width: 100%;
                    padding: 8px 20px;
                    font-size: 1rem;
                    border-radius: 20px;
                    border: 1px solid #ddd;
                    transition: all 0.3s ease;
                }
                .search-container input:focus {
                    border-color: #4CAF50;
                    outline: none;
                }
                .navbar-toggler {
                    border: none;
                }
            `}</style>
        </>
    );
};

export default Header;
