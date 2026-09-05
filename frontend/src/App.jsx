import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";

import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import CourseDetails from "./pages/CourseDetails";

import CreateAdmin from "./pages/CreateAdmin";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Create Admin */}
                <Route
                    path="/create-admin"
                    element={
                        <ProtectedRoute>
                            <CreateAdmin />
                        </ProtectedRoute>
                    }
                />

                {/* Students */}
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students/:id"
                    element={
                        <ProtectedRoute>
                            <StudentDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-student"
                    element={
                        <ProtectedRoute>
                            <AddStudent />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-student/:id"
                    element={
                        <ProtectedRoute>
                            <EditStudent />
                        </ProtectedRoute>
                    }
                />

                {/* Courses */}
                <Route
                    path="/courses"
                    element={
                        <ProtectedRoute>
                            <Courses />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/courses/:id"
                    element={
                        <ProtectedRoute>
                            <CourseDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-course"
                    element={
                        <ProtectedRoute>
                            <AddCourse />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-course/:id"
                    element={
                        <ProtectedRoute>
                            <EditCourse />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;