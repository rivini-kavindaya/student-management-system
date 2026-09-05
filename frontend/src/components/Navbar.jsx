import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    Student Management System
                </Link>

                <div>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/students"
                    >
                        Students
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/add-student"
                    >
                        Add Student
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/courses"
                    >
                        Courses
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    

                </div>

            </div>

        </nav>

    );
}

export default Navbar;