import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";
import { addCourse } from "../services/courseService";

function AddCourse() {

    const navigate = useNavigate();

    const [course, setCourse] = useState({
        courseCode: "",
        courseName: "",
        duration: "",
        fee: ""
    });

    const [saving, setSaving] = useState(false);

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
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    };

    const saveCourse = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await addCourse(course);

            showToast(
                "Course added successfully.",
                "success"
            );

            setTimeout(() => {
                navigate("/courses");
            }, 1200);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to add course. Please try again.",
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

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Add Course
                    </h2>

                    <p className="text-muted mb-0">
                        Create a new course in the system.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/courses")}
                    disabled={saving}
                >
                    ← Back to Courses
                </button>

            </div>

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    <div className="mb-4">
                        <h5 className="fw-bold mb-1">
                            Course Information
                        </h5>

                        <p className="text-muted mb-0">
                            Enter the course details below.
                        </p>
                    </div>

                    <form onSubmit={saveCourse}>

                        <div className="row g-4">

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Course Code
                                    <span className="text-danger ms-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="courseCode"
                                    placeholder="Example: SE101"
                                    value={course.courseCode}
                                    onChange={handleChange}
                                    disabled={saving}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Course Name
                                    <span className="text-danger ms-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="courseName"
                                    placeholder="Example: Software Engineering"
                                    value={course.courseName}
                                    onChange={handleChange}
                                    disabled={saving}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Duration
                                    <span className="text-danger ms-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="duration"
                                    placeholder="Example: 6 Months"
                                    value={course.duration}
                                    onChange={handleChange}
                                    disabled={saving}
                                    required
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Course Fee
                                    <span className="text-danger ms-1">*</span>
                                </label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        Rs.
                                    </span>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="fee"
                                        placeholder="50000"
                                        min="0"
                                        value={course.fee}
                                        onChange={handleChange}
                                        disabled={saving}
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-5 pt-3 border-top">

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={() => navigate("/courses")}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Course"
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}

export default AddCourse;