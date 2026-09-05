package com.student.studentmanagement.service;

import com.student.studentmanagement.entity.Course;
import com.student.studentmanagement.repository.CourseRepository;
import com.student.studentmanagement.repository.StudentRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private CourseService courseService;


    @Test
    void shouldDeleteCourseWhenNoStudentsAreEnrolled() {

        Course course = new Course();
        course.setId(1L);
        course.setCourseCode("SE101");
        course.setCourseName("Software Engineering");

        when(courseRepository.findById(1L))
                .thenReturn(Optional.of(course));

        when(studentRepository.existsByCourseDetailsId(1L))
                .thenReturn(false);

        courseService.deleteCourse(1L);

        verify(courseRepository)
                .delete(course);
    }

    @Test
    void shouldNotDeleteCourseWhenStudentsAreEnrolled() {

        Course course = new Course();
        course.setId(1L);
        course.setCourseCode("SE101");
        course.setCourseName("Software Engineering");

        when(courseRepository.findById(1L))
                .thenReturn(Optional.of(course));

        when(studentRepository.existsByCourseDetailsId(1L))
                .thenReturn(true);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> courseService.deleteCourse(1L)
                );

        assertEquals(
                "Cannot delete this course because students are enrolled.",
                exception.getMessage()
        );

        verify(courseRepository, never())
                .delete(course);
    }
}