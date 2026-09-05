import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";

import {
    getCourses,
    deleteCourse
} from "../services/courseService";

function Courses() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [deleting, setDeleting] = useState(false);

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

            setLoading(true);

            const data = await getCourses();

            setCourses(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to load courses.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };

    const openDeleteModal = (course) => {

        setSelectedCourse(course);
        setShowDeleteModal(true);

    };

    const closeDeleteModal = () => {

        if (deleting) return;

        setShowDeleteModal(false);
        setSelectedCourse(null);

    };

    const confirmDeleteCourse = async () => {

        if (!selectedCourse) return;

        try {

            setDeleting(true);

            await deleteCourse(selectedCourse.id);

            setShowDeleteModal(false);

            showToast(
                `${selectedCourse.courseName} deleted successfully.`,
                "success"
            );

            setSelectedCourse(null);

            await loadCourses();

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to delete course.",
                "error"
            );

        } finally {

            setDeleting(false);

        }
    };

    return (

        <AdminLayout>

            {/* Toast */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                title="Delete Course"
                message={
                    selectedCourse
                        ? `Are you sure you want to delete ${selectedCourse.courseName}? This action cannot be undone.`
                        : "Are you sure you want to delete this course?"
                }
                confirmText="Delete Course"
                type="danger"
                loading={deleting}
                onConfirm={confirmDeleteCourse}
                onCancel={closeDeleteModal}
            />

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Courses
                    </h2>

                    <p className="text-muted mb-0">
                        View and manage all available courses.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={() => navigate("/add-course")}
                >
                    + Add Course
                </button>

            </div>

            {/* Courses Card */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    <div className="mb-4">

                        <h5 className="fw-bold mb-1">
                            Course List
                        </h5>

                        <p className="text-muted mb-0">
                            Manage course details including code, duration and fee.
                        </p>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th className="py-3">
                                        ID
                                    </th>

                                    <th className="py-3">
                                        Course
                                    </th>

                                    <th className="py-3">
                                        Code
                                    </th>

                                    <th className="py-3">
                                        Duration
                                    </th>

                                    <th className="py-3">
                                        Fee
                                    </th>

                                    <th className="py-3 text-end">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >

                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                            >
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </div>

                                            <p className="text-muted mt-3 mb-0">
                                                Loading courses...
                                            </p>

                                        </td>

                                    </tr>

                                ) : courses.length > 0 ? (

                                    courses.map((course) => (

                                        <tr key={course.id}>

                                            <td className="fw-semibold">
                                                #{course.id}
                                            </td>

                                            <td>

                                                <div className="d-flex align-items-center gap-3">

                                                    <div
                                                        className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold"
                                                        style={{
                                                            width: "44px",
                                                            height: "44px",
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        {course.courseName
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <div className="fw-semibold">
                                                            {course.courseName}
                                                        </div>

                                                        <small className="text-muted">
                                                            Course
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                                    {course.courseCode}
                                                </span>

                                            </td>

                                            <td className="text-muted">
                                                {course.duration}
                                            </td>

                                            <td className="fw-semibold">
                                                Rs.{" "}
                                                {Number(
                                                    course.fee
                                                ).toLocaleString()}
                                            </td>

                                            {/* Updated Actions */}
                                            <td className="text-end">

                                                <div className="d-flex justify-content-end gap-2 flex-wrap">

                                                    {/* View */}
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/courses/${course.id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    {/* Edit */}
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/edit-course/${course.id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            openDeleteModal(course)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >

                                            <div className="fs-1 mb-3">
                                                📚
                                            </div>

                                            <h5 className="fw-semibold">
                                                No courses found
                                            </h5>

                                            <p className="text-muted mb-3">
                                                Create your first course to get started.
                                            </p>

                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    navigate("/add-course")
                                                }
                                            >
                                                + Add Course
                                            </button>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default Courses;