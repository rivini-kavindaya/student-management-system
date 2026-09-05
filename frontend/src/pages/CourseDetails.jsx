import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";

import { getCourseById } from "../services/courseService";
import { getStudents } from "../services/studentService";

function CourseDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    useEffect(() => {
        loadCourseDetails();
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

    const loadCourseDetails = async () => {

        try {

            setLoading(true);

            const [courseData, studentData] = await Promise.all([
                getCourseById(id),
                getStudents()
            ]);

            setCourse(courseData);
            setStudents(studentData);

        } catch (error) {

            console.log("Course details error:", error);

            showToast(
                "Failed to load course information.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };


    /*
     * Students enrolled in this course.
     *
     * Uses the Student -> Course relationship.
     */
    const enrolledStudents = useMemo(() => {

        if (!course) {
            return [];
        }

        return students.filter(
            (student) =>
                student.courseDetails?.id === course.id
        );

    }, [students, course]);


    const formatFee = (fee) => {

        if (fee === null || fee === undefined) {
            return "N/A";
        }

        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0
        }).format(fee);

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
                        Course Details
                    </h2>

                    <p className="text-muted mb-0">
                        View complete course information and enrollment details.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/courses")}
                >
                    ← Back to Courses
                </button>

            </div>


            {loading ? (

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <p className="text-muted mt-3 mb-0">
                            Loading course information...
                        </p>

                    </div>

                </div>

            ) : course ? (

                <>

                    {/* Course Details */}
                    <div className="row g-4 mb-4">


                        {/* Course Profile */}
                        <div className="col-12 col-xl-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4 text-center">

                                    <div
                                        className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
                                        style={{
                                            width: "90px",
                                            height: "90px",
                                            fontSize: "28px"
                                        }}
                                    >
                                        {course.courseCode
                                            ?.substring(0, 2)
                                            .toUpperCase()}
                                    </div>

                                    <h4 className="fw-bold mb-1">
                                        {course.courseName}
                                    </h4>

                                    <p className="text-muted mb-3">
                                        {course.courseCode}
                                    </p>

                                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                        {course.duration}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Course Information */}
                        <div className="col-12 col-xl-8">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4 p-lg-5">

                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-1">
                                            Course Information
                                        </h5>

                                        <p className="text-muted mb-0">
                                            General and academic information for this course.
                                        </p>

                                    </div>


                                    <div className="row g-4">


                                        {/* Course ID */}
                                        <div className="col-12 col-md-6">

                                            <small className="text-muted d-block mb-1">
                                                Course ID
                                            </small>

                                            <div className="fw-semibold">
                                                #{course.id}
                                            </div>

                                        </div>


                                        {/* Course Code */}
                                        <div className="col-12 col-md-6">

                                            <small className="text-muted d-block mb-1">
                                                Course Code
                                            </small>

                                            <div className="fw-semibold">
                                                {course.courseCode}
                                            </div>

                                        </div>


                                        {/* Course Name */}
                                        <div className="col-12 col-md-6">

                                            <small className="text-muted d-block mb-1">
                                                Course Name
                                            </small>

                                            <div className="fw-semibold">
                                                {course.courseName}
                                            </div>

                                        </div>


                                        {/* Duration */}
                                        <div className="col-12 col-md-6">

                                            <small className="text-muted d-block mb-1">
                                                Duration
                                            </small>

                                            <div className="fw-semibold">
                                                {course.duration}
                                            </div>

                                        </div>


                                        {/* Course Fee */}
                                        <div className="col-12 col-md-6">

                                            <small className="text-muted d-block mb-1">
                                                Course Fee
                                            </small>

                                            <div className="fw-semibold">
                                                {formatFee(course.fee)}
                                            </div>

                                        </div>


                                        {/* Enrollment Count */}
                                        <div className="col-12 col-md-6">

                                            <small className="text-muted d-block mb-1">
                                                Enrolled Students
                                            </small>

                                            <div className="fw-semibold">
                                                {enrolledStudents.length}
                                            </div>

                                        </div>

                                    </div>


                                    {/* Actions */}
                                    <div className="d-flex justify-content-end gap-2 mt-5 pt-4 border-top">

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() =>
                                                navigate("/courses")
                                            }
                                        >
                                            Back
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-primary px-4"
                                            onClick={() =>
                                                navigate(
                                                    `/edit-course/${course.id}`
                                                )
                                            }
                                        >
                                            Edit Course
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Enrolled Students */}
                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Enrolled Students
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Students currently assigned to this course.
                                    </p>

                                </div>

                                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">

                                    {enrolledStudents.length}{" "}

                                    {enrolledStudents.length === 1
                                        ? "Student"
                                        : "Students"}

                                </span>

                            </div>


                            {enrolledStudents.length > 0 ? (

                                <div className="table-responsive">

                                    <table className="table align-middle mb-0">

                                        <thead className="table-light">

                                            <tr>

                                                <th className="py-3">
                                                    ID
                                                </th>

                                                <th className="py-3">
                                                    Student
                                                </th>

                                                <th className="py-3">
                                                    Email
                                                </th>

                                                <th className="py-3">
                                                    Age
                                                </th>

                                                <th className="py-3 text-end">
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {enrolledStudents.map(
                                                (student) => (

                                                    <tr key={student.id}>

                                                        <td className="fw-semibold">
                                                            #{student.id}
                                                        </td>


                                                        <td>

                                                            <div className="d-flex align-items-center gap-3">

                                                                <div
                                                                    className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold"
                                                                    style={{
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        flexShrink: 0
                                                                    }}
                                                                >

                                                                    {student.name
                                                                        ?.charAt(0)
                                                                        .toUpperCase()}

                                                                </div>


                                                                <span className="fw-semibold">
                                                                    {student.name}
                                                                </span>

                                                            </div>

                                                        </td>


                                                        <td className="text-muted">
                                                            {student.email}
                                                        </td>


                                                        <td>
                                                            {student.age}
                                                        </td>


                                                        <td className="text-end">

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/students/${student.id}`
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            ) : (

                                <div className="text-center py-5">

                                    <div className="fs-1 mb-3">
                                        👥
                                    </div>

                                    <h5 className="fw-semibold">
                                        No students enrolled
                                    </h5>

                                    <p className="text-muted mb-0">
                                        There are currently no students assigned to this course.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </>

            ) : (

                /* Course Not Found */
                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body text-center py-5">

                        <div className="fs-1 mb-3">
                            📘
                        </div>

                        <h5 className="fw-bold">
                            Course not found
                        </h5>

                        <p className="text-muted">
                            The requested course record could not be found.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                navigate("/courses")
                            }
                        >
                            Back to Courses
                        </button>

                    </div>

                </div>

            )}

        </AdminLayout>
    );
}

export default CourseDetails;