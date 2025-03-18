import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [itineraries, setItineraries] = useState([]); // Store user-specific itineraries

    // Check if user is logged in
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                    fetchUserItineraries(data.user._id); // Fetch user's itineraries
                }
            } catch (error) {
                console.log("Auth failed: ", error);
            }
        };
        fetchUser();
    }, []);

    // Fetch user's itineraries from the backend
    const fetchUserItineraries = async (userId) => {
        try {
            const res = await fetch("/api/ai/savedIter");
            const data = await res.json();
            if (res.ok) {
                setItineraries(data.iters);
            }
        } catch (error) {
            console.log("Failed to fetch itineraries: ", error);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await res.json();
            console.log("Login Response:", data); // Log response to debug
    
            if (res.ok && data.user) {
                setUser(data.user);
                fetchUserItineraries(data.user._id); // Fetch itineraries
                window.location.href = "/";
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });
        setUser(null);
        setItineraries([]); // Clear itineraries on logout
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, itineraries }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
