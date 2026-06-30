import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await login(formData);

            navigate("/dashboard");

        }

        catch (err) {

            setError(
                err.response?.data?.detail ||
                "Login failed"
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
                    maxWidth: "400px",
                    margin: "80px auto",
                }}
            >

                <h2 className="form-title">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

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

                    <button
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>

                </form>

                <p
                    className="mt-2 text-center"
                >

                    Don't have an account?

                    {" "}

                    <Link
                        to="/register"
                        style={{
                            color: "#2563eb",
                            fontWeight: "bold",
                        }}
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;