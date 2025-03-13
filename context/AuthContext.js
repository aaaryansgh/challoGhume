import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is logged in
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (res.ok) setUser(data.user);
            } catch (error) {
                console.log("Auth failed: ", error);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            setUser(data.user);
            window.location.href = "/";
        } else {
            alert(data.error);
        }
    };

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };