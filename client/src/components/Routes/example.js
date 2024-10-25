// private.js
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                console.log("Token being sent: ", auth?.token); // Log the token
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);

                // Log the API response here:
                console.log("API response: ", res); // Check if the response contains 'ok: true'

                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error in authCheck: ", error);
                setOk(false); // Set `ok` to false in case of any error
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}








// skipMiddlewareFunction.js
import JWT, { decode } from 'jsonwebtoken'

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET)
    } catch (error) {
        console.log(error)

    }
}



export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (!user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Acess'
            })
        } else {
            req.user = decode;
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in Admin middleware"

        })

    }
}