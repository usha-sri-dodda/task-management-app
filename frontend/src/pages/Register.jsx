import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            await registerUser(formData);

            setSuccess("Registration successful.");

            setTimeout(() => {

                navigate("/login");

            }, 1000);

        }

        catch (err) {

            setError(
                err.response?.data?.detail ||
                "Registration failed."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="container">

            <div
                className="card"
                style={{
                    maxWidth: "450px",
                    margin: "60px auto",
                }}
            >

                <h2 className="form-title">

                    Register

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {

                        error &&

                        <p
                            style={{
                                color: "red",
                                marginBottom: "15px",
                            }}
                        >

                            {error}

                        </p>

                    }


                    {

                        success &&

                        <p
                            style={{
                                color: "green",
                                marginBottom: "15px",
                            }}
                        >

                            {success}

                        </p>

                    }


                    <button
                        className="btn btn-success"
                        style={{ width: "100%" }}
                    >

                        {

                            loading
                                ? "Creating Account..."
                                : "Register"

                        }

                    </button>

                </form>


                <p
                    className="text-center mt-2"
                >

                    Already have an account?

                    {" "}

                    <Link
                        to="/login"
                        style={{
                            color: "#2563eb",
                            fontWeight: "bold",
                        }}
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;