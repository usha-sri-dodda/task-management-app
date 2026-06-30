import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

import { createTask } from "../services/taskService";

const CreateTask = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
    };

    const handleCreate = async (taskData) => {

        setLoading(true);

        try {

            await createTask(taskData);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Failed to create task."
            );

        } finally {

            setLoading(false);

        }

    };

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
                        Create Task
                    </h2>

                    <TaskForm
                        initialValues={initialValues}
                        onSubmit={handleCreate}
                        loading={loading}
                    />

                </div>

            </div>

        </>

    );

};

export default CreateTask;