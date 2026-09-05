import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// Get all students
export const getStudents = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/students`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Delete student
export const deleteStudent = async (id) => {

    const token = localStorage.getItem("token");

    await axios.delete(
        `${API_URL}/students/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};


// Add student
export const addStudent = async (student) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/students`,
        student,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Get student by ID
export const getStudentById = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/students/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Update student
export const updateStudent = async (id, student) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/students/${id}`,
        student,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Search students by name
export const searchStudentsByName = async (name) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/students/search/${name}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Pagination + Sorting
export const getStudentsPage = async (
    page = 0,
    size = 5,
    sort = "id",
    direction = "asc"
) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/students/page`,
        {
            params: {
                page,
                size,
                sortBy: sort,
                direction
            },

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};