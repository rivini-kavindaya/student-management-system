import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";

import {
    getStudentById,
    updateStudent
} from "../services/studentService";

import { getCourses } from "../services/courseService";

function EditStudent() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        courseId: "",
        age: ""
    });

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [saving, setSaving] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    useEffect(() => {
        loadPageData();
    }, [id]);


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


    const loadPageData = async () => {

        try {

            setLoading(true);
            setLoadingCourses(true);

            const [studentData, courseData] = await Promise.all([
                getStudentById(id),
                getCourses()
            ]);

            setStudent({
                name: studentData.name || "",
                email: studentData.email || "",
                age: studentData.age || "",
                courseId:
                    studentData.courseDetails?.id?.toString() || ""
            });

            setCourses(courseData);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to load student or course information.",
                "error"
            );

        } finally {

            setLoading(false);
            setLoadingCourses(false);

        }
    };


    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

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

            const studentData = {
                name: student.name,
                email: student.email,
                age: Number(student.age),

                courseDetails: {
                    id: Number(student.courseId)
                }
            };

            await updateStudent(id, studentData);

            showToast(
                "Student updated successfully.",
                "success"
            );

            setTimeout(() => {
                navigate("/students");
            }, 1200);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to update student. Please try again.",
                "error"
            );

        } finally {

            setSaving(false);

        }
    };


    return (

        <AdminLayout>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />


            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Edit Student
                    </h2>

                    <p className="text-muted mb-0">
                        Update the selected student's information.
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

                    {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                            <p className="text-muted mt-3 mb-0">
                                Loading student information...
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="mb-4">

                                <h5 className="fw-bold mb-1">
                                    Student Information
                                </h5>

                                <p className="text-muted mb-0">
                                    Review and update the student's personal
                                    and academic details.
                                </p>

                            </div>


                            <form onSubmit={handleSubmit}>

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
                                            disabled={
                                                saving ||
                                                loadingCourses
                                            }
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
                                                    {course.courseCode} -{" "}
                                                    {course.courseName}
                                                </option>

                                            ))}

                                        </select>


                                        {!loadingCourses &&
                                            courses.length === 0 && (

                                                <small className="text-danger d-block mt-2">

                                                    No courses are available.
                                                    Please create a course first.

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
                                        onClick={() =>
                                            navigate("/students")
                                        }
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

                                                Updating...

                                            </>

                                        ) : (

                                            "Update Student"

                                        )}

                                    </button>

                                </div>

                            </form>

                        </>

                    )}

                </div>

            </div>

        </AdminLayout>
    );
}

export default EditStudent;