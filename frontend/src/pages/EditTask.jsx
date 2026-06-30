import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

import {
    getTask,
    updateTask,
} from "../services/taskService";

const EditTask = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [task, setTask] = useState(null);

    useEffect(() => {

        const loadTask = async () => {

            try {

                const data = await getTask(id);

                setTask(data);

            } catch (error) {

                alert("Task not found.");

                navigate("/dashboard");

            } finally {

                setLoading(false);

            }

        };

        loadTask();

    }, [id]);

    const handleUpdate = async (updatedTask) => {

        setLoading(true);

        try {

            await updateTask(id, updatedTask);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Update failed."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading && !task) {

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

                    <h2
                        className="form-title"
                    >
                        Edit Task
                    </h2>

                    <TaskForm
                        initialValues={task}
                        onSubmit={handleUpdate}
                        loading={loading}
                    />

                </div>

            </div>

        </>

    );

};

export default EditTask;