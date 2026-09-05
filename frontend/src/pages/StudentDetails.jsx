import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";

import { getStudentById } from "../services/studentService";

function StudentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    useEffect(() => {
        loadStudent();
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

    const loadStudent = async () => {

        try {

            setLoading(true);

            const data = await getStudentById(id);

            setStudent(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to load student information.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };


    const formatFee = (fee) => {

        if (fee === null || fee === undefined) {
            return "Not Available";
        }

        return new Intl.NumberFormat(
            "en-LK",
            {
                style: "currency",
                currency: "LKR",
                minimumFractionDigits: 2
            }
        ).format(fee);

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
                        Student Details
                    </h2>

                    <p className="text-muted mb-0">
                        View complete student information.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/students")}
                >
                    ← Back to Students
                </button>

            </div>


            {loading ? (

                /* Loading */
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
                            Loading student information...
                        </p>

                    </div>

                </div>

            ) : student ? (

                <div className="row g-4">


                    {/* Student Profile Card */}
                    <div className="col-12 col-xl-4">

                        <div className="card border-0 shadow-sm rounded-4 h-100">

                            <div className="card-body p-4 text-center">

                                <div
                                    className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold mx-auto mb-3"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        fontSize: "32px"
                                    }}
                                >
                                    {student.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <h4 className="fw-bold mb-1">
                                    {student.name}
                                </h4>

                                <p className="text-muted mb-3">
                                    Student #{student.id}
                                </p>

                                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">

                                    {student.courseDetails?.courseName ||
                                        "No Course"}

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Student Information */}
                    <div className="col-12 col-xl-8">

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body p-4 p-lg-5">


                                {/* Personal Information */}
                                <div className="mb-4">

                                    <h5 className="fw-bold mb-1">
                                        Personal Information
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Student profile and academic information.
                                    </p>

                                </div>


                                <div className="row g-4">

                                    {/* Student ID */}
                                    <div className="col-12 col-md-6">

                                        <small className="text-muted d-block mb-1">
                                            Student ID
                                        </small>

                                        <div className="fw-semibold">
                                            #{student.id}
                                        </div>

                                    </div>


                                    {/* Full Name */}
                                    <div className="col-12 col-md-6">

                                        <small className="text-muted d-block mb-1">
                                            Full Name
                                        </small>

                                        <div className="fw-semibold">
                                            {student.name}
                                        </div>

                                    </div>


                                    {/* Email */}
                                    <div className="col-12 col-md-6">

                                        <small className="text-muted d-block mb-1">
                                            Email Address
                                        </small>

                                        <div className="fw-semibold">
                                            {student.email}
                                        </div>

                                    </div>


                                    {/* Age */}
                                    <div className="col-12 col-md-6">

                                        <small className="text-muted d-block mb-1">
                                            Age
                                        </small>

                                        <div className="fw-semibold">
                                            {student.age}
                                        </div>

                                    </div>

                                </div>


                                {/* Course Information */}
                                <div className="border-top mt-5 pt-4">

                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-1">
                                            Course Information
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Course currently assigned to this student.
                                        </p>

                                    </div>


                                    {student.courseDetails ? (

                                        <div className="row g-4">


                                            {/* Course Code */}
                                            <div className="col-12 col-md-6">

                                                <small className="text-muted d-block mb-1">
                                                    Course Code
                                                </small>

                                                <div className="fw-semibold">
                                                    {student.courseDetails.courseCode}
                                                </div>

                                            </div>


                                            {/* Course Name */}
                                            <div className="col-12 col-md-6">

                                                <small className="text-muted d-block mb-1">
                                                    Course Name
                                                </small>

                                                <div className="fw-semibold">
                                                    {student.courseDetails.courseName}
                                                </div>

                                            </div>


                                            {/* Duration */}
                                            <div className="col-12 col-md-6">

                                                <small className="text-muted d-block mb-1">
                                                    Duration
                                                </small>

                                                <div className="fw-semibold">
                                                    {student.courseDetails.duration ||
                                                        "Not Available"}
                                                </div>

                                            </div>


                                            {/* Course Fee */}
                                            <div className="col-12 col-md-6">

                                                <small className="text-muted d-block mb-1">
                                                    Course Fee
                                                </small>

                                                <div className="fw-semibold">
                                                    {formatFee(
                                                        student.courseDetails.fee
                                                    )}
                                                </div>

                                            </div>

                                        </div>

                                    ) : (

                                        <div className="alert alert-warning mb-0">

                                            No course information is available
                                            for this student.

                                        </div>

                                    )}

                                </div>


                                {/* Actions */}
                                <div className="d-flex justify-content-end gap-2 mt-5 pt-4 border-top">

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() =>
                                            navigate("/students")
                                        }
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary px-4"
                                        onClick={() =>
                                            navigate(
                                                `/edit-student/${student.id}`
                                            )
                                        }
                                    >
                                        Edit Student
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            ) : (

                /* Student Not Found */
                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body text-center py-5">

                        <div className="fs-1 mb-3">
                            👤
                        </div>

                        <h5 className="fw-bold">
                            Student not found
                        </h5>

                        <p className="text-muted">
                            The requested student record could not be found.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                navigate("/students")
                            }
                        >
                            Back to Students
                        </button>

                    </div>

                </div>

            )}

        </AdminLayout>
    );
}

export default StudentDetails;