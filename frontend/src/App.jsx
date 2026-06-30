import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";

function App() {

    const { isAuthenticated } = useAuth();

    return (

        <Routes>

            {/* Default Route */}
            <Route
                path="/"
                element={
                    isAuthenticated
                        ? <Navigate to="/dashboard" replace />
                        : <Navigate to="/login" replace />
                }
            />

            {/* Public Routes */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks/create"
                element={
                    <ProtectedRoute>
                        <CreateTask />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks/:id"
                element={
                    <ProtectedRoute>
                        <TaskDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditTask />
                    </ProtectedRoute>
                }
            />

            {/* 404 */}
            <Route
                path="*"
                element={<h2>404 - Page Not Found</h2>}
            />

        </Routes>

    );

}

export default App;