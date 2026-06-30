import { Link } from "react-router-dom";

const TaskCard = ({ task, onDelete }) => {

    return (

        <div
            className="card task-card"
            style={{ marginBottom: "20px" }}
        >

            <div className="flex-between">

                <div>

                    <h3>{task.title}</h3>

                    <p
                        style={{
                            marginTop: "10px",
                            color: "#555",
                        }}
                    >
                        {task.description}
                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >

                    <span>

                        <strong>Status:</strong>

                        {" "}

                        {task.status}

                    </span>

                    <span>

                        <strong>Priority:</strong>

                        {" "}

                        {task.priority}

                    </span>

                    <span>

                        <strong>Due:</strong>

                        {" "}

                        {task.due_date || "N/A"}

                    </span>

                </div>

            </div>

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                }}
            >

                <Link
                    to={`/tasks/${task.id}`}
                    className="btn btn-primary"
                >
                    View
                </Link>

                <Link
                    to={`/tasks/${task.id}/edit`}
                    className="btn btn-success"
                >
                    Edit
                </Link>

                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>

            </div>

        </div>

    );

};

export default TaskCard;