import React, { useState } from 'react'
import { Link, json, useNavigate } from "react-router-dom";
import { makeApi } from '../helper/helper';
import '../assets/style/Login.css';
import {  toast } from "react-toastify";


const Login = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((oldval) => ({
            ...oldval,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('form data', userData);

        try {
            const userLogin = await makeApi('post', "/login", userData)
            console.log("userLogin", userLogin);
            const userToken = JSON.stringify(userLogin.token)
            localStorage.setItem('UserToken', (userToken))
            toast.success("user login successfully")
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="login">
                <div className="loginunder">
                    <form onSubmit={handleSubmit}>
                        <div className="login-container shadow-lg">
                            <h4 className='text-center text-white mt-3'>Login</h4>
                            <div className="login-under">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className='inputdata mb-4'>
                                <i className="fa-solid fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder='Email ID'
                                    id="email"
                                    className="text-white"
                                    name='email'
                                    value={userData.email}
                                    onChange={handleChange}
                                />

                            </div>
                            <div className='inputdata mb-4'>
                                <i className="fa-solid fa-eye"></i>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    id="password"
                                    className="text-white"
                                    name='password'
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='d-flex justify-content-between flex-wrap inputtext'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultValue=""
                                        id="defaultCheck1"
                                    />
                                    <label className="form-check-label text-white" htmlFor="defaultCheck1">
                                        Remember me
                                    </label>
                                </div>
                                <a href='' className='text-white text-decoration-none'>Forgot password</a>
                            </div>
                            <div className='d-flex justify-content-center mt-4'>
                                <button className='Sumbitbtn' type="submit">Login</button>
                            </div>
                            <div className="inputtext mt-3">
                                <p className='text-white text-center'>Don't have an account yet?<Link to="/register">Registered</Link></p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default Login
