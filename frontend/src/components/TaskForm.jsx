import { useEffect, useState } from "react";

const TaskForm = ({
    initialValues,
    onSubmit,
    loading = false,
}) => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
    });

    // Update form when editing a task
    useEffect(() => {

        if (initialValues) {

            setFormData({
                title: initialValues.title || "",
                description: initialValues.description || "",
                status: initialValues.status || "Pending",
                priority: initialValues.priority || "Medium",
                due_date: initialValues.due_date || "",
            });

        }

    }, [initialValues]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const taskData = {
            ...formData,
            due_date: formData.due_date === "" ? null : formData.due_date,
        };
        onSubmit(taskData);

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="form-group">

                <label>Title</label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="form-group">

                <label>Description</label>

                <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                />

            </div>

            <div className="form-group">

                <label>Status</label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

            </div>

            <div className="form-group">

                <label>Priority</label>

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

            </div>

            <div className="form-group">

                <label>Due Date (Optional)</label>

                <input
                    type="date"
                    name="due_date"
                    value={formData.due_date || ""}
                    onChange={handleChange}
                />
    

            </div>

            <button
                type="submit"
                className="btn btn-success"
                style={{ width: "100%" }}
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Task"}
            </button>

        </form>

    );

};

export default TaskForm;