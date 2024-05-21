import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const handleRegister = async () => {
        try {
            const response = await axios.post("/api/register", { username, email, password });
            if (response.data.userId) {
                setMessage("Registration successful");
                history.push("/login");
            } else {
                setMessage("Registration failed");
            }
        } catch (error) {
            setMessage("Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl mb-8">Register</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="mb-4 p-2 border border-gray-300"
            />
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
                onClick={handleRegister} 
                className="bg-blue-500 text-white p-2 rounded"
            >
                Register
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Register;

