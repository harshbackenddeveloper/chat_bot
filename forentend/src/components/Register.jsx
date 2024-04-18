import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { makeApi } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import '../assets/style/Register.css';
import {  toast } from "react-toastify";

const Register = () => {

    const nevigate = useNavigate()

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
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
            const userRegister = await makeApi('post', "/register", userData)
            console.log(userRegister);
            toast.success("user register successfully")
            nevigate('/login')
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className='registerd'>
                <div className="registerdunder">
                    <form onSubmit={handleSubmit}>
                        <div className="registerd-container">
                            <h4 className='text-center text-white mt-3'>Registraion</h4>
                            <div className="registerd-under">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className='Rinputdata mb-4'>
                                        <i className="fa-solid fa-user"></i>
                                        <input
                                            type="text"
                                            placeholder='First Name'
                                            className="text-white"
                                            id="firstName"
                                            name='firstName'
                                            value={userData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className='Rinputdata mb-4'>
                                        <i className="fa-solid fa-user"></i>
                                        <input
                                            type="text"
                                            placeholder='Last Name'
                                            className="text-white"
                                            id="lastName"
                                            name='lastName'
                                            value={userData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className='Rinputdata mb-4'>
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
                                </div>
                                <div className="col-6">
                                    <div className='Rinputdata mb-4'>
                                        <i className="fa-solid fa-lock"></i>
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
                                </div>
                                <div className='d-flex justify-content-center mt-2 mb-3'>
                                    <button className='registertbtn' type="submit">Registerd</button>
                                </div>
                            </div>

                            <div className="Rinputtext ">
                                <p className='text-white text-center'>Alreay your account exists?<Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
