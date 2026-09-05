package com.student.studentmanagement.controller;

import com.student.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DashboardController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();

        data.put("systemName", "Student Management System");
        data.put("totalStudents", studentRepository.count());

        return data;
    }
}