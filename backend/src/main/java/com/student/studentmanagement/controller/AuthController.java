package com.student.studentmanagement.controller;

import com.student.studentmanagement.dto.LoginRequest;
import com.student.studentmanagement.dto.LoginResponse;
import com.student.studentmanagement.dto.RegisterResponse;
import com.student.studentmanagement.entity.Admin;
import com.student.studentmanagement.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private AdminService service;

    // Login
    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {
        return service.login(request);
    }

    // Create Admin Account
    @PostMapping("/register")
    public RegisterResponse register(
            @RequestBody Admin admin
    ) {

        Admin savedAdmin = service.registerAdmin(admin);

        return new RegisterResponse(
                savedAdmin.getId(),
                savedAdmin.getUsername(),
                savedAdmin.getRole(),
                "Admin account created successfully"
        );
    }
}