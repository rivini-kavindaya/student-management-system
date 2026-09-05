package com.student.studentmanagement.service;

import com.student.studentmanagement.dto.LoginRequest;
import com.student.studentmanagement.dto.LoginResponse;
import com.student.studentmanagement.entity.Admin;
import com.student.studentmanagement.repository.AdminRepository;
import com.student.studentmanagement.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Login
    public LoginResponse login(LoginRequest request) {

        Admin admin =
                repository.findByUsername(request.getUsername());

        if (admin == null) {
            throw new RuntimeException("User Not Found");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        String token =
                jwtService.generateToken(
                        admin.getUsername()
                );

        return new LoginResponse(token);
    }


    // Create New Admin Account
    public Admin registerAdmin(Admin admin) {

        // Check username
        Admin existingAdmin =
                repository.findByUsername(
                        admin.getUsername()
                );

        if (existingAdmin != null) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }


        // Validate username
        if (
                admin.getUsername() == null ||
                        admin.getUsername().trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Username is required"
            );
        }


        // Validate password
        if (
                admin.getPassword() == null ||
                        admin.getPassword().length() < 6
        ) {

            throw new RuntimeException(
                    "Password must contain at least 6 characters"
            );
        }


        // Encrypt password
        String encodedPassword =
                passwordEncoder.encode(
                        admin.getPassword()
                );

        admin.setPassword(encodedPassword);


        // Always create account as ADMIN
        admin.setRole("ADMIN");


        // Save
        return repository.save(admin);
    }
}