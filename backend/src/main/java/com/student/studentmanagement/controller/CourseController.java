package com.student.studentmanagement.controller;

import com.student.studentmanagement.entity.Course;
import com.student.studentmanagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {

        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    // Add course
    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    // Update course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody Course course) {

        return ResponseEntity.ok(
                courseService.updateCourse(id, course)
        );
    }

    // Delete course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {

        courseService.deleteCourse(id);

        return ResponseEntity.noContent().build();
    }
}