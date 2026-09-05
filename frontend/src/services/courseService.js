import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


// Get all courses
export const getCourses = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/courses`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Add course
export const addCourse = async (course) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/courses`,
        course,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Get course by ID
export const getCourseById = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/courses/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Update course
export const updateCourse = async (id, course) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/courses/${id}`,
        course,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Delete course
export const deleteCourse = async (id) => {

    const token = localStorage.getItem("token");

    await axios.delete(
        `${API_URL}/courses/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};