import { createContext, useContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    loginUser,
    logoutUser
} from "../services/authService";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // -----------------------------
    // Load Logged-in User
    // -----------------------------
    const loadUser = async () => {

        try {

            const data = await getCurrentUser();

            setUser(data);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadUser();

    }, []);


    // -----------------------------
    // Login
    // -----------------------------
    const login = async (credentials) => {

        await loginUser(credentials);

        await loadUser();

    };


    // -----------------------------
    // Logout
    // -----------------------------
    const logout = () => {

        logoutUser();

        setUser(null);

    };


    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuth = () => {

    return useContext(AuthContext);

};