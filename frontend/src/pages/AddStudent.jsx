import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";

import { addStudent } from "../services/studentService";
import { getCourses } from "../services/courseService";

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        courseId: "",
        age: ""
    });

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const [saving, setSaving] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    useEffect(() => {
        loadCourses();
    }, []);

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

    const loadCourses = async () => {

        try {

            setLoadingCourses(true);

            const data = await getCourses();

            setCourses(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to load courses.",
                "error"
            );

        } finally {

            setLoadingCourses(false);

        }
    };

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };

    const saveStudent = async (e) => {

        e.preventDefault();

        if (!student.courseId) {

            showToast(
                "Please select a course.",
                "error"
            );

            return;
        }

        try {

            setSaving(true);

            /*
             * Build the request that will be sent to Spring Boot.
             *
             * courseDetails.id represents the real Course foreign key.
             */
            const studentData = {

                name: student.name,

                email: student.email,

                age: Number(student.age),

                courseDetails: {
                    id: Number(student.courseId)
                }

            };

            await addStudent(studentData);

            showToast(
                "Student added successfully.",
                "success"
            );

            setTimeout(() => {
                navigate("/students");
            }, 1200);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to add student. Please try again.",
                "error"
            );

        } finally {

            setSaving(false);

        }
    };

    return (

        <AdminLayout>

            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Add Student
                    </h2>

                    <p className="text-muted mb-0">
                        Create a new student record in the system.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/students")}
                    disabled={saving}
                >
                    ← Back to Students
                </button>

            </div>

            {/* Form Card */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    <div className="mb-4">

                        <h5 className="fw-bold mb-1">
                            Student Information
                        </h5>

                        <p className="text-muted mb-0">
                            Enter the student's personal and academic details.
                        </p>

                    </div>

                    <form onSubmit={saveStudent}>

                        <div className="row g-4">

                            {/* Name */}
                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Full Name
                                    <span className="text-danger ms-1">
                                        *
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter student full name"
                                    value={student.name}
                                    onChange={handleChange}
                                    disabled={saving}
                                    required
                                />

                            </div>

                            {/* Email */}
                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Email Address
                                    <span className="text-danger ms-1">
                                        *
                                    </span>
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="student@example.com"
                                    value={student.email}
                                    onChange={handleChange}
                                    disabled={saving}
                                    required
                                />

                            </div>

                            {/* Course */}
                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Course
                                    <span className="text-danger ms-1">
                                        *
                                    </span>
                                </label>

                                <select
                                    className="form-select"
                                    name="courseId"
                                    value={student.courseId}
                                    onChange={handleChange}
                                    disabled={saving || loadingCourses}
                                    required
                                >

                                    <option value="">
                                        {loadingCourses
                                            ? "Loading courses..."
                                            : "Select a course"}
                                    </option>

                                    {courses.map((course) => (

                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.courseCode} - {course.courseName}
                                        </option>

                                    ))}

                                </select>

                                {!loadingCourses && courses.length === 0 && (

                                    <small className="text-danger d-block mt-2">
                                        No courses are available. Please create a course first.
                                    </small>

                                )}

                            </div>

                            {/* Age */}
                            <div className="col-12 col-md-6">

                                <label className="form-label fw-semibold">
                                    Age
                                    <span className="text-danger ms-1">
                                        *
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    placeholder="Enter age"
                                    min="16"
                                    value={student.age}
                                    onChange={handleChange}
                                    disabled={saving}
                                    required
                                />

                            </div>

                        </div>

                        {/* Actions */}
                        <div className="d-flex justify-content-end gap-2 mt-5 pt-3 border-top">

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={() => navigate("/students")}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={
                                    saving ||
                                    loadingCourses ||
                                    courses.length === 0
                                }
                            >

                                {saving ? (

                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>

                                        Saving...
                                    </>

                                ) : (

                                    "Save Student"

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}

export default AddStudent;