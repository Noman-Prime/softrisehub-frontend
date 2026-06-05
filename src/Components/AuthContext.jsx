import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkLogin = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, { withCredentials: true });
            if (result.data && result.data.user) {
                setUser(result.data.user);
            }
        } catch (error) {
            console.log("Not logged in natively:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, checkLogin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;