import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import ConfirmModel from "../components/ConfirmModel";

import {
    getTasks,
    deleteTask,
} from "../services/taskService";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);

    const [pageInfo, setPageInfo] = useState({
        total: 0,
        page: 1,
        limit: 10,
        total_pages: 1,
    });

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
        sort_by: "",
        order: "asc",
        page: 1,
        limit: 10,
    });

    const [confirmingTask, setConfirmingTask] = useState(null);
    const [loading, setLoading] = useState(true);

    // -----------------------------
    // Load Tasks
    // -----------------------------
    const loadTasks = async () => {

        setLoading(true);

        try {

            const data = await getTasks(filters);

            setTasks(data.items);

            setPageInfo({
                total: data.total,
                page: data.page,
                limit: data.limit,
                total_pages: data.total_pages,
            });

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTasks();

    }, [filters]);

    // -----------------------------
    // Delete Task
    // -----------------------------
    const handleDelete = (id) => {
        const task = tasks.find(t => t.id === id);

        setConfirmingTask({
            id,
            title: task?.title || "this task",
        });
    };

    const closeConfirm = () => {
        setConfirmingTask(null);
    };

    const handleConfirmDelete = async () => {
        if (!confirmingTask) return;

        await deleteTask(confirmingTask.id);
        setConfirmingTask(null);
        loadTasks();
    };

    // -----------------------------
    // Search
    // -----------------------------
    const handleSearch = (value) => {

        setFilters({
            ...filters,
            search: value,
            page: 1,
        });

    };

    // -----------------------------
    // Filter
    // -----------------------------
    const handleFilterChange = (field, value) => {

        const updatedFilters = {
            ...filters,
            page: 1,
        };

        if (field === "sortBy") {

            updatedFilters.sort_by = value;

        }

        else {

            updatedFilters[field] = value;

        }

        setFilters(updatedFilters);

    };

    // -----------------------------
    // Pagination
    // -----------------------------
    const changePage = (page) => {

        setFilters({
            ...filters,
            page,
        });

    };

    // -----------------------------
    // Statistics
    // -----------------------------
    const total = pageInfo.total;

    const pending = tasks.filter(
        t => t.status === "Pending"
    ).length;

    const progress = tasks.filter(
        t => t.status === "In Progress"
    ).length;

    const completed = tasks.filter(
        t => t.status === "Completed"
    ).length;

    return (

        <>

            <Navbar />

            <div className="container">

                <h2>

                    Welcome,

                    {" "}

                    {user?.username}

                </h2>

                <div
                    className="grid"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(180px,1fr))",
                        marginTop: "20px",
                        marginBottom: "25px",
                    }}
                >

                    <div className="card">

                        <h3>Total</h3>

                        <h2>{total}</h2>

                    </div>

                    <div className="card">

                        <h3>Pending</h3>

                        <h2>{pending}</h2>

                    </div>

                    <div className="card">

                        <h3>In Progress</h3>

                        <h2>{progress}</h2>

                    </div>

                    <div className="card">

                        <h3>Completed</h3>

                        <h2>{completed}</h2>

                    </div>

                </div>

                <SearchBar
                    onSearch={handleSearch}
                />

                <FilterBar
                    status={filters.status}
                    priority={filters.priority}
                    sortBy={filters.sort_by}
                    order={filters.order}
                    onChange={handleFilterChange}
                />

                <ConfirmModel
                    open={Boolean(confirmingTask)}
                    title="Delete Task"
                    message={`Are you sure you want to delete "${confirmingTask?.title}"? This action cannot be undone.`}
                    onConfirm={handleConfirmDelete}
                    onCancel={closeConfirm}
                />

                {

                    loading ?

                        <h3>

                            Loading...

                        </h3>

                        :

                        tasks.length === 0 ?

                            <div className="card">

                                <h3>

                                    No tasks found.

                                </h3>

                            </div>

                            :

                            tasks.map(task => (

                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDelete}
                                />

                            ))

                }

                <Pagination
                    currentPage={pageInfo.page}
                    totalPages={pageInfo.total_pages}
                    onPageChange={changePage}
                />

            </div>

        </>

    );

};

export default Dashboard;