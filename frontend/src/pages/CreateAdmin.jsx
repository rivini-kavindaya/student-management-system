import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";

const API_URL = import.meta.env.VITE_API_URL;

function CreateAdmin() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    const showToast = (message, type = "success") => {

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

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.username.trim()) {

            showToast(
                "Username is required.",
                "error"
            );

            return;
        }

        if (form.password.length < 6) {

            showToast(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }

        if (form.password !== form.confirmPassword) {

            showToast(
                "Passwords do not match.",
                "error"
            );

            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/register`,
                {
                    username: form.username,
                    password: form.password
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            showToast(
                "Admin account created successfully.",
                "success"
            );

            setForm({
                username: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {

            console.log("Create admin error:", error);

            if (error.response?.status === 409) {

                showToast(
                    "Username already exists.",
                    "error"
                );

            } else if (error.response?.status === 403) {

                showToast(
                    "You do not have permission to create an admin account.",
                    "error"
                );

            } else if (!error.response) {

                showToast(
                    "Cannot connect to the server.",
                    "error"
                );

            } else {

                showToast(
                    error.response?.data ||
                    "Failed to create admin account.",
                    "error"
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (

        <AdminLayout>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Create Admin Account
                    </h2>

                    <p className="text-muted mb-0">
                        Create another administrator account for the system.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/dashboard")}
                    disabled={loading}
                >
                    ← Back to Dashboard
                </button>

            </div>

            <div className="row justify-content-center">

                <div className="col-12 col-lg-8 col-xl-6">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4 p-lg-5">

                            <div className="mb-4">

                                <h5 className="fw-bold mb-1">
                                    Administrator Information
                                </h5>

                                <p className="text-muted mb-0">
                                    Enter the login credentials for the new administrator.
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Username
                                        <span className="text-danger ms-1">
                                            *
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="Enter admin username"
                                        value={form.username}
                                        onChange={handleChange}
                                        disabled={loading}
                                        autoComplete="off"
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Password
                                        <span className="text-danger ms-1">
                                            *
                                        </span>
                                    </label>

                                    <div className="login-password-wrapper">

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control login-password-input"
                                            name="password"
                                            placeholder="Enter password"
                                            value={form.password}
                                            onChange={handleChange}
                                            disabled={loading}
                                            autoComplete="new-password"
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

                                    <small className="text-muted">
                                        Password must contain at least 6 characters.
                                    </small>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Confirm Password
                                        <span className="text-danger ms-1">
                                            *
                                        </span>
                                    </label>

                                    <div className="login-password-wrapper">

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control login-password-input"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            disabled={loading}
                                            autoComplete="new-password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="login-password-toggle"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            disabled={loading}
                                        >
                                            {showConfirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </div>

                                <div className="alert alert-light border mb-4">

                                    <strong>
                                        Account Role:
                                    </strong>{" "}
                                    ADMIN

                                    <div className="small text-muted mt-1">
                                        The backend automatically assigns the ADMIN role.
                                    </div>

                                </div>

                                <div className="d-flex justify-content-end gap-2 pt-3 border-top">

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() =>
                                            navigate("/dashboard")
                                        }
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Creating...
                                            </>

                                        ) : (

                                            "Create Admin"

                                        )}

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default CreateAdmin;