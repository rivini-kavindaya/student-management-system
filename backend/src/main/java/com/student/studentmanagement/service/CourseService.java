package com.student.studentmanagement.service;

import com.student.studentmanagement.entity.Course;
import com.student.studentmanagement.repository.CourseRepository;
import com.student.studentmanagement.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;


    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }


    // Get course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }


    // Add course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }


    // Update course
    public Course updateCourse(Long id, Course updatedCourse) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Course not found")
                );

        course.setCourseCode(updatedCourse.getCourseCode());
        course.setCourseName(updatedCourse.getCourseName());
        course.setDuration(updatedCourse.getDuration());
        course.setFee(updatedCourse.getFee());

        return courseRepository.save(course);
    }


    // Delete course safely
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Course not found")
                );

        boolean hasStudents =
                studentRepository.existsByCourseDetailsId(id);

        if (hasStudents) {

            throw new RuntimeException(
                    "Cannot delete this course because students are enrolled."
            );
        }

        courseRepository.delete(course);
    }
}