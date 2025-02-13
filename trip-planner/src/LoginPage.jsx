import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

// Login Page
const LoginPage = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const correctUsername = "moy";
    const correctPassword = "password";

    const handleLogin = () => {
        if (username == correctUsername && password == correctPassword) {
            navigate("/homepage");
        } else {
            alert("Invalid username and/or password.");
        }
    }

    return (
        <div>
            <h1>Let's go places.</h1>
            <div>
                <label>USERNAME</label>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label >PASSWORD</label>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>LOGIN</button>
            </div>
        </div>
    );
};

export default LoginPage