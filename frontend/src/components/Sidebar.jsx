import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    SM
                </div>

                <div>
                    <h4>StudentMS</h4>
                    <span>Admin Panel</span>
                </div>
            </div>

            <div className="sidebar-menu">

                <p className="sidebar-section-title">
                    MAIN MENU
                </p>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">⌂</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/students"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">👥</span>
                    Students
                </NavLink>

                <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">▣</span>
                    Courses
                </NavLink>

            </div>

            <div className="sidebar-bottom">

                <button
                    className="sidebar-logout"
                    onClick={logout}
                >
                    <span>↪</span>
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;