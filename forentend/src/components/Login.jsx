import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { makeApi } from '../helper/helper';


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
            const userLogin = await makeApi('post', "/UserLogin", userData)
            console.log("userLogin", userLogin);
            alert('user login successfully')
            localStorage.setItem('LoginUserId', userLogin.data._id)
            if (userLogin.data._id) {
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section
                className="vh-100 bg-image"
                style={{
                    backgroundImage:
                        'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")'
                }}
            >
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: 15 }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">
                                            Login  account
                                        </h2>

                                        <form onSubmit={handleSubmit}>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form3Example3cg"
                                                    className="form-control form-control-lg"
                                                    name='email'
                                                    value={userData.email}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form3Example3cg">
                                                    Email
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form3Example4cg"
                                                    className="form-control form-control-lg"
                                                    name='password'
                                                    value={userData.password}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="form3Example4cg">
                                                    Password
                                                </label>
                                            </div>


                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Do not have an account?{" "}
                                                <Link to="/register" className="fw-bold text-body">
                                                    <u>Register here</u>
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
