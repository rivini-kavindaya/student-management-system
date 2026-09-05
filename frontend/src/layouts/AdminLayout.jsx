import Sidebar from "../components/Sidebar";
import "../styles/admin.css";

function AdminLayout({ children }) {

    return (
        <div className="admin-layout">

            <Sidebar />

            <main className="admin-main">

                <div className="admin-topbar">

                    <div>
                        <h5 className="mb-0">
                            Student Management System
                        </h5>

                        <small className="text-muted">
                            Administration Dashboard
                        </small>
                    </div>

                    <div className="admin-profile">

                        <div className="admin-avatar">
                            A
                        </div>

                        <div className="admin-profile-info">
                            <strong>Administrator</strong>
                            <span>Admin</span>
                        </div>

                    </div>

                </div>

                <div className="admin-content">
                    {children}
                </div>

            </main>

        </div>
    );
}

export default AdminLayout;