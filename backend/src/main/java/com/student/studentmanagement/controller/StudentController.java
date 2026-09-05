package com.student.studentmanagement.controller;

import com.student.studentmanagement.entity.Student;
import com.student.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    // CREATE
    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return service.saveStudent(student);
    }

    // READ ALL
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return service.getStudentById(id);
    }

    // SEARCH BY NAME
    @GetMapping("/search/{name}")
    public List<Student> searchStudentByName(@PathVariable String name) {
        return service.searchStudentByName(name);
    }

    //SEARCH BY COURSE
    @GetMapping("/course/{course}")
    public List<Student> getStudentsByCourse(@PathVariable String course) {
        return service.getStudentsByCourse(course);
    }

    // SEARCH BY EMAIL
    @GetMapping("/email/{email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return service.getStudentByEmail(email);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student student) {

        return service.updateStudent(id, student);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        service.deleteStudent(id);

        return "Student Deleted Successfully";
    }

    @GetMapping("/page")
    public Page<Student> getStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return service.getStudentsWithPaginationAndSorting(
                page,
                size,
                sortBy,
                direction);
    }
}