import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [roll_no, setRollNo] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, roll_no, password, phone, address, answer }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')


        }
    }

    return (
        <Layout title="Register-Reselify">
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="InputName"
                            placeholder='Name'
                            required

                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            onChange={(e) => setRollNo(e.target.value)}
                            value={roll_no}
                            className="form-control"
                            id="InputRollNo"
                            placeholder='Roll No'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            id="InputEmail"
                            placeholder='Email'
                            required

                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="form-control"
                            id="InputPhone"
                            placeholder='Phone'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            className="form-control"
                            id="InputAdress"
                            placeholder='Adress'
                            required
                        />
                    </div>

                    <div className="mb-3">

                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            id="InputPassword1"
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            onChange={(e) => setAnswer(e.target.value)}
                            value={answer}
                            className="form-control"
                            id="InputAnswer"
                            placeholder='Enter Your favorite Sport Name'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>

            </div>
        </Layout>
    )
}

export default Register
