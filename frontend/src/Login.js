import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/login", { email, password });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setMessage("Login successful");
                history.push("/dashboard");
            } else {
                setMessage("Login failed");
            }
        } catch (error) {
            setMessage("Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl mb-8">Login</h1>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mb-4 p-2 border border-gray-300"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mb-4 p-2 border border-gray-300"
            />
            <button 
                onClick={handleLogin} 
                className="bg-blue-500 text-white p-2 rounded"
            >
                Login
            </button>
            <Link to="/register" className="mt-4 text-blue-500">Register</Link>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Login;

