import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <div className="container flex-between">

                <Link to="/dashboard">

                    <h2>TaskFlow</h2>

                </Link>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                    }}
                >

                    <span>

                        Hello,

                        <strong>

                            {" "}

                            {user?.username}

                        </strong>

                    </span>

                    <Link
                        className="btn btn-secondary"
                        to="/dashboard"
                    >

                        Dashboard

                    </Link>

                    <Link
                        className="btn btn-success"
                        to="/tasks/create"
                    >

                        + New Task

                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;