import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";

import {
    deleteStudent,
    searchStudentsByName,
    getStudentsPage
} from "../services/studentService";

function Students() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");

    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadStudents(0, pageSize, sortBy, direction);
    }, [pageSize, sortBy, direction]);

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

    const loadStudents = async (
        page = currentPage,
        size = pageSize,
        sort = sortBy,
        dir = direction
    ) => {

        try {

            setLoading(true);

            const data = await getStudentsPage(
                page,
                size,
                sort,
                dir
            );

            setStudents(data.content);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to load students.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };

    const openDeleteModal = (student) => {

        setSelectedStudent(student);
        setShowDeleteModal(true);

    };

    const closeDeleteModal = () => {

        if (deleting) return;

        setShowDeleteModal(false);
        setSelectedStudent(null);

    };

    const confirmDeleteStudent = async () => {

        if (!selectedStudent) return;

        try {

            setDeleting(true);

            await deleteStudent(selectedStudent.id);

            setShowDeleteModal(false);

            showToast(
                `${selectedStudent.name} deleted successfully.`,
                "success"
            );

            setSelectedStudent(null);

            await loadStudents(
                currentPage,
                pageSize,
                sortBy,
                direction
            );

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to delete student.",
                "error"
            );

        } finally {

            setDeleting(false);

        }
    };

    const searchStudents = async () => {

        try {

            if (searchName.trim() === "") {

                loadStudents(
                    0,
                    pageSize,
                    sortBy,
                    direction
                );

                return;
            }

            setLoading(true);

            const data = await searchStudentsByName(searchName);

            setStudents(data);

        } catch (error) {

            console.log(error);

            showToast(
                "Failed to search students.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };

    const clearSearch = () => {

        setSearchName("");

        loadStudents(
            0,
            pageSize,
            sortBy,
            direction
        );

    };

    const previousPage = () => {

        if (currentPage > 0) {

            loadStudents(
                currentPage - 1,
                pageSize,
                sortBy,
                direction
            );

        }
    };

    const nextPage = () => {

        if (currentPage + 1 < totalPages) {

            loadStudents(
                currentPage + 1,
                pageSize,
                sortBy,
                direction
            );

        }
    };

    return (

        <AdminLayout>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />

            <ConfirmModal
                show={showDeleteModal}
                title="Delete Student"
                message={
                    selectedStudent
                        ? `Are you sure you want to delete ${selectedStudent.name}? This action cannot be undone.`
                        : "Are you sure you want to delete this student?"
                }
                confirmText="Delete Student"
                type="danger"
                loading={deleting}
                onConfirm={confirmDeleteStudent}
                onCancel={closeDeleteModal}
            />

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Students
                    </h2>

                    <p className="text-muted mb-0">
                        View and manage all registered students.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={() => navigate("/add-student")}
                >
                    + Add Student
                </button>

            </div>

            {/* Main Card */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    {/* Search */}
                    <div className="row g-3 align-items-end mb-4">

                        <div className="col-12 col-lg-5">

                            <label className="form-label fw-semibold">
                                Search Student
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by student name..."
                                value={searchName}
                                onChange={(e) =>
                                    setSearchName(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        searchStudents();
                                    }
                                }}
                            />

                        </div>

                        <div className="col-6 col-lg-2">

                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={searchStudents}
                            >
                                Search
                            </button>

                        </div>

                        <div className="col-6 col-lg-2">

                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={clearSearch}
                            >
                                Clear
                            </button>

                        </div>

                    </div>

                    {/* Filters */}
                    <div className="row g-3 mb-4">

                        <div className="col-12 col-md-4 col-xl-3">

                            <label className="form-label fw-semibold">
                                Students Per Page
                            </label>

                            <select
                                className="form-select"
                                value={pageSize}
                                onChange={(e) =>
                                    setPageSize(Number(e.target.value))
                                }
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>

                        </div>

                        <div className="col-12 col-md-4 col-xl-3">

                            <label className="form-label fw-semibold">
                                Sort By
                            </label>

                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value)
                                }
                            >
                                <option value="id">
                                    Student ID
                                </option>

                                <option value="name">
                                    Name
                                </option>

                                <option value="email">
                                    Email
                                </option>

                                <option value="courseDetails.courseName">
                                    Course
                                </option>

                                <option value="age">
                                    Age
                                </option>
                            </select>

                        </div>

                        <div className="col-12 col-md-4 col-xl-3">

                            <label className="form-label fw-semibold">
                                Sort Direction
                            </label>

                            <select
                                className="form-select"
                                value={direction}
                                onChange={(e) =>
                                    setDirection(e.target.value)
                                }
                            >
                                <option value="asc">
                                    Ascending
                                </option>

                                <option value="desc">
                                    Descending
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* Table */}
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
                                        Course
                                    </th>

                                    <th className="py-3">
                                        Age
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
                                                Loading students...
                                            </p>

                                        </td>

                                    </tr>

                                ) : students.length > 0 ? (

                                    students.map((student) => (

                                        <tr key={student.id}>

                                            <td className="fw-semibold">
                                                #{student.id}
                                            </td>

                                            <td>

                                                <div className="d-flex align-items-center gap-3">

                                                    <div
                                                        className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold"
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        {student.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <div className="fw-semibold">
                                                            {student.name}
                                                        </div>

                                                        <small className="text-muted">
                                                            Student
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="text-muted">
                                                {student.email}
                                            </td>

                                            <td>

                                                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                                    {student.courseDetails?.courseName || "No Course"}
                                                </span>

                                            </td>

                                            <td>
                                                {student.age}
                                            </td>

                                            <td className="text-end">

                                                <div className="d-flex justify-content-end gap-2 flex-wrap">

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

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/edit-student/${student.id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            openDeleteModal(student)
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
                                                👥
                                            </div>

                                            <h5 className="fw-semibold">
                                                No students found
                                            </h5>

                                            <p className="text-muted mb-0">
                                                Try changing your search or add a new student.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    {searchName.trim() === "" && !loading && (

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-4">

                            <div className="text-muted small">

                                Page{" "}

                                <strong>
                                    {totalPages === 0
                                        ? 0
                                        : currentPage + 1}
                                </strong>

                                {" "}of{" "}

                                <strong>
                                    {totalPages}
                                </strong>

                            </div>

                            <div className="d-flex gap-2">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    disabled={currentPage === 0}
                                    onClick={previousPage}
                                >
                                    ← Previous
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    disabled={
                                        totalPages === 0 ||
                                        currentPage + 1 >= totalPages
                                    }
                                    onClick={nextPage}
                                >
                                    Next →
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </AdminLayout>
    );
}

export default Students;