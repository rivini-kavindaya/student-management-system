import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/DashboardCard";
import Toast from "../components/Toast";

import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";

function Dashboard() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    useEffect(() => {
        loadDashboardData();
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

    const loadDashboardData = async () => {

        try {

            setLoading(true);

            const [studentData, courseData] = await Promise.all([
                getStudents(),
                getCourses()
            ]);

            setStudents(studentData);
            setCourses(courseData);

        } catch (error) {

            console.log("Dashboard error:", error);

            showToast(
                "Failed to load dashboard information.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };


    /*
     * Student distribution by course
     *
     * Uses the real Student -> Course relationship.
     */
    const courseDistribution = useMemo(() => {

        return courses.map((course) => {

            const count = students.filter(
                (student) =>
                    student.courseDetails?.id === course.id
            ).length;

            const percentage =
                students.length > 0
                    ? (count / students.length) * 100
                    : 0;

            return {
                id: course.id,
                courseCode: course.courseCode,
                courseName: course.courseName,
                count,
                percentage
            };

        });

    }, [students, courses]);


    /*
     * Average student age
     */
    const averageAge = useMemo(() => {

        if (students.length === 0) {
            return 0;
        }

        const validAges = students
            .map((student) => Number(student.age))
            .filter((age) => !Number.isNaN(age));

        if (validAges.length === 0) {
            return 0;
        }

        const totalAge = validAges.reduce(
            (total, age) => total + age,
            0
        );

        return (
            totalAge / validAges.length
        ).toFixed(1);

    }, [students]);


    /*
     * Most popular course
     */
    const mostPopularCourse = useMemo(() => {

        if (courseDistribution.length === 0) {
            return null;
        }

        return courseDistribution.reduce(
            (highest, current) =>
                current.count > highest.count
                    ? current
                    : highest
        );

    }, [courseDistribution]);


    /*
     * Recent students
     */
    const recentStudents = useMemo(() => {

        return [...students]
            .sort((a, b) => b.id - a.id)
            .slice(0, 5);

    }, [students]);


    return (

        <AdminLayout>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />


            {/* PAGE HEADER */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Dashboard
                    </h2>

                    <p className="text-muted mb-0">
                        Overview of students, courses and enrollment analytics.
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() =>
                            navigate("/courses")
                        }
                    >
                        View Courses
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            navigate("/add-student")
                        }
                    >
                        + Add Student
                    </button>

                </div>

            </div>


            {/* KPI CARDS */}
            <div className="row g-4 mb-4">

                <div className="col-12 col-md-6 col-xl-3">

                    <DashboardCard
                        title="Total Students"
                        value={
                            loading
                                ? "..."
                                : students.length
                        }
                        icon="👥"
                        subtitle="Registered students"
                    />

                </div>


                <div className="col-12 col-md-6 col-xl-3">

                    <DashboardCard
                        title="Total Courses"
                        value={
                            loading
                                ? "..."
                                : courses.length
                        }
                        icon="📚"
                        subtitle="Available courses"
                    />

                </div>


                <div className="col-12 col-md-6 col-xl-3">

                    <DashboardCard
                        title="Average Age"
                        value={
                            loading
                                ? "..."
                                : students.length > 0
                                    ? averageAge
                                    : "0"
                        }
                        icon="🎂"
                        subtitle="Average student age"
                    />

                </div>


                <div className="col-12 col-md-6 col-xl-3">

                    <DashboardCard
                        title="Popular Course"
                        value={
                            loading
                                ? "..."
                                : mostPopularCourse &&
                                  mostPopularCourse.count > 0
                                    ? mostPopularCourse.courseCode
                                    : "N/A"
                        }
                        icon="🏆"
                        subtitle={
                            mostPopularCourse &&
                            mostPopularCourse.count > 0
                                ? `${mostPopularCourse.count} enrolled`
                                : "No enrollments yet"
                        }
                    />

                </div>

            </div>


            {/* ANALYTICS */}
            <div className="row g-4 mb-4">

                {/* Course Distribution Chart */}
                <div className="col-12 col-xl-8">

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                        <div className="card-body p-4">

                            <div className="mb-4">

                                <h5 className="fw-bold mb-1">
                                    Course Distribution
                                </h5>

                                <p className="text-muted mb-0">
                                    Number of students enrolled in each course.
                                </p>

                            </div>


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

                                </div>

                            ) : courseDistribution.length > 0 ? (

                                <div
                                    style={{
                                        width: "100%",
                                        height: 340
                                    }}
                                >

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <BarChart
                                            data={courseDistribution}
                                            margin={{
                                                top: 10,
                                                right: 20,
                                                left: 0,
                                                bottom: 20
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />

                                            <XAxis
                                                dataKey="courseCode"
                                            />

                                            <YAxis
                                                allowDecimals={false}
                                            />

                                            <Tooltip
                                                formatter={(value) => [
                                                    `${value} students`,
                                                    "Enrollment"
                                                ]}
                                                labelFormatter={(label) => {

                                                    const course =
                                                        courseDistribution.find(
                                                            (item) =>
                                                                item.courseCode === label
                                                        );

                                                    return course
                                                        ? `${course.courseCode} - ${course.courseName}`
                                                        : label;
                                                }}
                                            />

                                            <Bar
                                                dataKey="count"
                                                fill="#2563eb"
                                                radius={[8, 8, 0, 0]}
                                            />

                                        </BarChart>

                                    </ResponsiveContainer>

                                </div>

                            ) : (

                                <div className="text-center py-5">

                                    <div className="fs-1 mb-3">
                                        📊
                                    </div>

                                    <h6 className="fw-semibold">
                                        No course data available
                                    </h6>

                                    <p className="text-muted mb-0">
                                        Add courses to display analytics.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                </div>


                {/* Enrollment Percentage */}
                <div className="col-12 col-xl-4">

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                        <div className="card-body p-4">

                            <div className="mb-4">

                                <h5 className="fw-bold mb-1">
                                    Enrollment Share
                                </h5>

                                <p className="text-muted mb-0">
                                    Percentage of students in each course.
                                </p>

                            </div>


                            {loading ? (

                                <div className="text-center py-5">

                                    <div
                                        className="spinner-border text-primary"
                                        role="status"
                                    ></div>

                                </div>

                            ) : courseDistribution.length > 0 ? (

                                <div className="d-flex flex-column gap-4">

                                    {courseDistribution.map(
                                        (course) => (

                                            <div key={course.id}>

                                                <div className="d-flex justify-content-between align-items-center mb-2">

                                                    <div>

                                                        <div className="fw-semibold">
                                                            {course.courseCode}
                                                        </div>

                                                        <small className="text-muted">
                                                            {course.courseName}
                                                        </small>

                                                    </div>

                                                    <strong>
                                                        {course.percentage.toFixed(1)}%
                                                    </strong>

                                                </div>


                                                <div
                                                    className="progress"
                                                    style={{
                                                        height: "8px"
                                                    }}
                                                >

                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{
                                                            width:
                                                                `${course.percentage}%`
                                                        }}
                                                        aria-valuenow={
                                                            course.percentage
                                                        }
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    ></div>

                                                </div>


                                                <small className="text-muted d-block mt-2">

                                                    {course.count}{" "}

                                                    {course.count === 1
                                                        ? "student"
                                                        : "students"}

                                                </small>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="text-muted">
                                    No enrollment data available.
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* RECENT STUDENTS */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                        <div>

                            <h5 className="fw-bold mb-1">
                                Recent Students
                            </h5>

                            <p className="text-muted mb-0">
                                Recently added student records.
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                                navigate("/students")
                            }
                        >
                            View All Students
                        </button>

                    </div>


                    <div className="table-responsive">

                        <table className="table align-middle mb-0">

                            <thead className="table-light">

                                <tr>

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

                                </tr>

                            </thead>


                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center py-5"
                                        >

                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                            ></div>

                                        </td>

                                    </tr>

                                ) : recentStudents.length > 0 ? (

                                    recentStudents.map(
                                        (student) => (

                                            <tr key={student.id}>

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


                                                        <div>

                                                            <div className="fw-semibold">
                                                                {student.name}
                                                            </div>

                                                            <small className="text-muted">
                                                                #{student.id}
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td className="text-muted">
                                                    {student.email}
                                                </td>


                                                <td>

                                                    <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">

                                                        {student.courseDetails
                                                            ?.courseName ||
                                                            "No Course"}

                                                    </span>

                                                </td>


                                                <td>
                                                    {student.age}
                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center py-5"
                                        >

                                            <div className="fs-1 mb-2">
                                                👥
                                            </div>

                                            <h6>
                                                No students available
                                            </h6>

                                            <p className="text-muted mb-0">
                                                Add students to see recent activity.
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* QUICK ACTIONS */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    <h5 className="fw-bold mb-1">
                        Quick Actions
                    </h5>

                    <p className="text-muted mb-4">
                        Common administration tasks.
                    </p>


                    <div className="row g-3">

                        <div className="col-12 col-md-6 col-xl-3">

                            <button
                                type="button"
                                className="btn btn-light border w-100 text-start p-3 rounded-3 h-100"
                                onClick={() =>
                                    navigate("/add-student")
                                }
                            >

                                <div className="fw-bold mb-1">
                                    ➕ Add Student
                                </div>

                                <small className="text-muted">
                                    Register a new student.
                                </small>

                            </button>

                        </div>


                        <div className="col-12 col-md-6 col-xl-3">

                            <button
                                type="button"
                                className="btn btn-light border w-100 text-start p-3 rounded-3 h-100"
                                onClick={() =>
                                    navigate("/students")
                                }
                            >

                                <div className="fw-bold mb-1">
                                    👥 Manage Students
                                </div>

                                <small className="text-muted">
                                    View and edit students.
                                </small>

                            </button>

                        </div>


                        <div className="col-12 col-md-6 col-xl-3">

                            <button
                                type="button"
                                className="btn btn-light border w-100 text-start p-3 rounded-3 h-100"
                                onClick={() =>
                                    navigate("/add-course")
                                }
                            >

                                <div className="fw-bold mb-1">
                                    📘 Add Course
                                </div>

                                <small className="text-muted">
                                    Create a new course.
                                </small>

                            </button>

                        </div>


                        <div className="col-12 col-md-6 col-xl-3">

                            <button
                                type="button"
                                className="btn btn-light border w-100 text-start p-3 rounded-3 h-100"
                                onClick={() =>
                                    navigate("/courses")
                                }
                            >

                                <div className="fw-bold mb-1">
                                    📚 Manage Courses
                                </div>

                                <small className="text-muted">
                                    View and update courses.
                                </small>

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default Dashboard;