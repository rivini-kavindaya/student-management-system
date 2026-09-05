import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Toast from "../components/Toast";
import { login } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    const showToastMessage = (message, type = "success") => {
        setToast({
            message,
            type
        });

        setTimeout(() => {
            setToast({
                message: "",
                type: "success"
            });
        }, 3000);
    };

    const closeToast = () => {
        setToast({
            message: "",
            type: "success"
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            showToastMessage(
                "Please enter your username and password.",
                "error"
            );
            return;
        }

        try {
            setLoading(true);

            const data = await login(username, password);

            if (!data?.token) {
                showToastMessage(
                    "Login failed. Authentication token was not received.",
                    "error"
                );
                return;
            }

            localStorage.setItem("token", data.token);

            showToastMessage(
                "Login successful. Welcome back!",
                "success"
            );

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);

        } catch (error) {
            console.log("Login error:", error);

            if (error.response?.status === 401) {
                showToastMessage(
                    "Invalid username or password.",
                    "error"
                );
            } else if (error.response?.status === 403) {
                showToastMessage(
                    "You do not have permission to access this system.",
                    "error"
                );
            } else if (!error.response) {
                showToastMessage(
                    "Cannot connect to the server. Please make sure the backend is running.",
                    "error"
                );
            } else {
                showToastMessage(
                    "Login failed. Please try again.",
                    "error"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />

            <div className="login-wrapper">

                <div className="login-brand-panel">

                    <div className="login-brand-content">

                        <div className="login-logo">
                            SM
                        </div>

                        <h1>
                            Student Management System
                        </h1>

                        <p>
                            Manage students, courses and academic information
                            from one secure administration platform.
                        </p>

                        <div className="login-features">

                            <div className="login-feature">
                                <span>✓</span>
                                Secure JWT authentication
                            </div>

                            <div className="login-feature">
                                <span>✓</span>
                                Student management
                            </div>

                            <div className="login-feature">
                                <span>✓</span>
                                Course management
                            </div>

                            <div className="login-feature">
                                <span>✓</span>
                                Simple administration dashboard
                            </div>

                        </div>

                    </div>

                </div>

                <div className="login-form-panel">

                    <div className="login-form-card">

                        <div className="mb-4">

                            <h2 className="fw-bold mb-2">
                                Welcome Back
                            </h2>

                            <p className="text-muted mb-0">
                                Sign in to access the administration dashboard.
                            </p>

                        </div>

                        <form onSubmit={handleLogin}>

                            <div className="mb-4">

                                <label className="form-label fw-semibold">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className="form-control login-input"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    disabled={loading}
                                    autoComplete="username"
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <div className="login-password-wrapper">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control login-input login-password-input"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        disabled={loading}
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="login-password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        disabled={loading}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="rememberMe"
                                    />

                                    <label
                                        className="form-check-label text-muted"
                                        htmlFor="rememberMe"
                                    >
                                        Remember me
                                    </label>

                                </div>

                                <span className="login-security-text">
                                    Secure Login
                                </span>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 login-button"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}

                            </button>

                        </form>

                        <div className="login-footer">
                            Student Management System
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;