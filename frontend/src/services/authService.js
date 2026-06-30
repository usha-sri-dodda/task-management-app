import api from "./api";

// Register User
export const registerUser = async (userData) => {
    const response = await api.post("/users/register", userData);
    return response.data;
};

// Login User
export const loginUser = async (credentials) => {
    const response = await api.post("/users/login", credentials);

    localStorage.setItem("token", response.data.access_token);

    return response.data;
};

// Get Current Logged-in User
export const getCurrentUser = async () => {
    const response = await api.get("/users/me");
    return response.data;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem("token");
};

// Check Login Status
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};