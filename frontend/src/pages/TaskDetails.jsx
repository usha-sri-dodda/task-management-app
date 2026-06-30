import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getTask } from "../services/taskService";

const TaskDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadTask = async () => {

            try {

                const data = await getTask(id);

                setTask(data);

            } catch {

                navigate("/dashboard");

            } finally {

                setLoading(false);

            }

        };

        loadTask();

    }, [id]);

    if (loading) {

        return <h2 className="text-center mt-3">Loading...</h2>;

    }

    return (

        <>
            <Navbar />

            <div className="container">

                <div
                    className="card"
                    style={{
                        maxWidth: "700px",
                        margin: "30px auto",
                    }}
                >

                    <h2>{task.title}</h2>

                    <p
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        {task.description}
                    </p>

                    <hr
                        style={{
                            margin: "20px 0",
                        }}
                    />

                    <p>

                        <strong>Status:</strong>

                        {" "}

                        {task.status}

                    </p>

                    <p>

                        <strong>Priority:</strong>

                        {" "}

                        {task.priority}

                    </p>

                    <p>

                        <strong>Due Date:</strong>

                        {" "}

                        {task.due_date || "N/A"}

                    </p>

                    <p>

                        <strong>Created:</strong>

                        {" "}

                        {new Date(task.created_at).toLocaleString()}

                    </p>

                    <p>

                        <strong>Updated:</strong>

                        {" "}

                        {new Date(task.updated_at).toLocaleString()}

                    </p>

                    <Link
                        to="/dashboard"
                        className="btn btn-primary mt-2"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </>

    );

};

export default TaskDetails;