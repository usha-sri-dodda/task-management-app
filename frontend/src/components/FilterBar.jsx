const FilterBar = ({
    status,
    priority,
    sortBy,
    order,
    onChange,
}) => {

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "15px",
                marginBottom: "20px",
            }}
        >

            <select
                value={status}
                onChange={(e) =>
                    onChange("status", e.target.value)
                }
            >

                <option value="">All Status</option>

                <option>Pending</option>

                <option>In Progress</option>

                <option>Completed</option>

            </select>

            <select
                value={priority}
                onChange={(e) =>
                    onChange("priority", e.target.value)
                }
            >

                <option value="">All Priority</option>

                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

            </select>

            <select
                value={sortBy}
                onChange={(e) =>
                    onChange("sortBy", e.target.value)
                }
            >

                <option value="">Sort By</option>

                <option value="title">Title</option>

                <option value="priority">Priority</option>

                <option value="status">Status</option>

                <option value="created_at">Created</option>

                <option value="due_date">Due Date</option>

            </select>

            <select
                value={order}
                onChange={(e) =>
                    onChange("order", e.target.value)
                }
            >

                <option value="asc">
                    Ascending
                </option>

                <option value="desc">
                    Descending
                </option>

            </select>

        </div>

    );

};

export default FilterBar;