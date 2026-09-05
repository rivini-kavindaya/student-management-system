package com.student.studentmanagement.service;

import com.student.studentmanagement.entity.Course;
import com.student.studentmanagement.entity.Student;
import com.student.studentmanagement.repository.CourseRepository;
import com.student.studentmanagement.repository.StudentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student;
    private Course course;

    @BeforeEach
    void setUp() {

        course = new Course();
        course.setId(1L);
        course.setCourseCode("SE101");
        course.setCourseName("Software Engineering");
        course.setDuration("6 Months");
        course.setFee(50000.0);

        student = new Student();
        student.setId(1L);
        student.setName("Rivini");
        student.setEmail("rivini@gmail.com");
        student.setAge(24);

        Course selectedCourse = new Course();
        selectedCourse.setId(1L);

        student.setCourseDetails(selectedCourse);
    }


    @Test
    void shouldSaveStudentSuccessfully() {

        when(courseRepository.findById(1L))
                .thenReturn(Optional.of(course));

        when(studentRepository.save(student))
                .thenReturn(student);

        Student savedStudent =
                studentService.saveStudent(student);

        assertNotNull(savedStudent);

        assertEquals(
                "Rivini",
                savedStudent.getName()
        );

        assertEquals(
                "Software Engineering",
                savedStudent
                        .getCourseDetails()
                        .getCourseName()
        );

        verify(courseRepository)
                .findById(1L);

        verify(studentRepository)
                .save(student);
    }

    @Test
    void shouldThrowErrorWhenCourseIsMissing() {

        student.setCourseDetails(null);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> studentService.saveStudent(student)
                );

        assertEquals(
                "Course is required",
                exception.getMessage()
        );

        verify(studentRepository, never())
                .save(any(Student.class));
    }

    @Test
    void shouldThrowErrorWhenCourseNotFound() {

        when(courseRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> studentService.saveStudent(student)
                );

        assertEquals(
                "Course not found with id: 1",
                exception.getMessage()
        );

        verify(studentRepository, never())
                .save(any(Student.class));
    }

    @Test
    void shouldUpdateStudentSuccessfully() {

        Student existingStudent = new Student();
        existingStudent.setId(1L);
        existingStudent.setName("Old Name");
        existingStudent.setEmail("old@gmail.com");
        existingStudent.setAge(20);

        Course oldCourse = new Course();
        oldCourse.setId(2L);
        existingStudent.setCourseDetails(oldCourse);

        Student updatedStudent = new Student();
        updatedStudent.setName("Rivini");
        updatedStudent.setEmail("rivini@gmail.com");
        updatedStudent.setAge(24);

        Course selectedCourse = new Course();
        selectedCourse.setId(1L);
        updatedStudent.setCourseDetails(selectedCourse);

        when(studentRepository.findById(1L))
                .thenReturn(Optional.of(existingStudent));

        when(courseRepository.findById(1L))
                .thenReturn(Optional.of(course));

        when(studentRepository.save(existingStudent))
                .thenReturn(existingStudent);

        Student result =
                studentService.updateStudent(
                        1L,
                        updatedStudent
                );

        assertNotNull(result);

        assertEquals(
                "Rivini",
                result.getName()
        );

        assertEquals(
                "rivini@gmail.com",
                result.getEmail()
        );

        assertEquals(
                24,
                result.getAge()
        );

        assertEquals(
                "Software Engineering",
                result
                        .getCourseDetails()
                        .getCourseName()
        );

        verify(studentRepository)
                .findById(1L);

        verify(courseRepository)
                .findById(1L);

        verify(studentRepository)
                .save(existingStudent);
    }

    @Test
    void shouldDeleteStudentSuccessfully() {

        doNothing()
                .when(studentRepository)
                .deleteById(1L);

        studentService.deleteStudent(1L);

        verify(studentRepository)
                .deleteById(1L);
    }
}

