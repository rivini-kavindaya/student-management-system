package com.student.studentmanagement.service;

import com.student.studentmanagement.entity.Course;
import com.student.studentmanagement.entity.Student;
import com.student.studentmanagement.repository.CourseRepository;
import com.student.studentmanagement.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    @Autowired
    private CourseRepository courseRepository;


    // CREATE STUDENT
    public Student saveStudent(Student student) {

        if (
                student.getCourseDetails() == null ||
                        student.getCourseDetails().getId() == null
        ) {
            throw new RuntimeException("Course is required");
        }

        Long courseId = student.getCourseDetails().getId();

        Course course = courseRepository
                .findById(courseId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Course not found with id: " + courseId
                        )
                );

        student.setCourseDetails(course);

        return repository.save(student);
    }


    // READ ALL STUDENTS
    public List<Student> getAllStudents() {

        return repository.findAll();

    }


    // READ STUDENT BY ID
    public Student getStudentById(Long id) {

        return repository
                .findById(id)
                .orElse(null);

    }


    // SEARCH STUDENT BY NAME
    public List<Student> searchStudentByName(String name) {

        return repository.findByName(name);

    }


    // SEARCH STUDENTS BY COURSE NAME
    public List<Student> getStudentsByCourse(String course) {

        return repository
                .findByCourseDetailsCourseName(course);

    }


    // SEARCH STUDENT BY EMAIL
    public Student getStudentByEmail(String email) {

        return repository.findByEmail(email);

    }


    // UPDATE STUDENT
    public Student updateStudent(
            Long id,
            Student student
    ) {

        Student existingStudent = repository
                .findById(id)
                .orElse(null);

        if (existingStudent == null) {

            return null;

        }

        existingStudent.setName(
                student.getName()
        );

        existingStudent.setEmail(
                student.getEmail()
        );

        existingStudent.setAge(
                student.getAge()
        );


        if (
                student.getCourseDetails() == null ||
                        student.getCourseDetails().getId() == null
        ) {
            throw new RuntimeException("Course is required");
        }


        Long courseId =
                student.getCourseDetails().getId();

        Course course = courseRepository
                .findById(courseId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Course not found with id: " + courseId
                        )
                );


        existingStudent.setCourseDetails(course);


        return repository.save(
                existingStudent
        );

    }


    // DELETE STUDENT
    public void deleteStudent(Long id) {

        repository.deleteById(id);

    }


    // PAGINATION + SORTING
    public Page<Student> getStudentsWithPaginationAndSorting(
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        Sort sort =
                direction.equalsIgnoreCase("desc")
                        ? Sort.by(sortBy).descending()
                        : Sort.by(sortBy).ascending();

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        sort
                );

        return repository.findAll(
                pageable
        );

    }
}