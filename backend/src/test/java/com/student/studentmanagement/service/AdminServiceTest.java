package com.student.studentmanagement.service;

import com.student.studentmanagement.dto.LoginRequest;
import com.student.studentmanagement.dto.LoginResponse;
import com.student.studentmanagement.entity.Admin;
import com.student.studentmanagement.repository.AdminRepository;
import com.student.studentmanagement.security.JwtService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminService adminService;


    @Test
    void shouldLoginSuccessfully() {

        Admin admin = new Admin();
        admin.setId(1L);
        admin.setUsername("admin");
        admin.setPassword("$2a$10$hashedPassword");
        admin.setRole("ADMIN");

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("Admin@123");

        when(adminRepository.findByUsername("admin"))
                .thenReturn(admin);

        when(passwordEncoder.matches(
                "Admin@123",
                "$2a$10$hashedPassword"
        )).thenReturn(true);

        when(jwtService.generateToken("admin"))
                .thenReturn("fake-jwt-token");

        LoginResponse response =
                adminService.login(request);

        assertNotNull(response);

        assertEquals(
                "fake-jwt-token",
                response.getToken()
        );

        verify(adminRepository)
                .findByUsername("admin");

        verify(passwordEncoder)
                .matches(
                        "Admin@123",
                        "$2a$10$hashedPassword"
                );

        verify(jwtService)
                .generateToken("admin");
    }

    @Test
    void shouldFailLoginWhenPasswordIsWrong() {

        Admin admin = new Admin();
        admin.setId(1L);
        admin.setUsername("admin");
        admin.setPassword("$2a$10$hashedPassword");
        admin.setRole("ADMIN");

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("WrongPassword");

        when(adminRepository.findByUsername("admin"))
                .thenReturn(admin);

        when(passwordEncoder.matches(
                "WrongPassword",
                "$2a$10$hashedPassword"
        )).thenReturn(false);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> adminService.login(request)
                );

        assertEquals(
                "Invalid Password",
                exception.getMessage()
        );

        verify(jwtService, never())
                .generateToken(anyString());
    }

    @Test
    void shouldNotRegisterAdminWhenUsernameAlreadyExists() {

        Admin existingAdmin = new Admin();
        existingAdmin.setId(1L);
        existingAdmin.setUsername("admin");
        existingAdmin.setPassword("$2a$10$hashedPassword");
        existingAdmin.setRole("ADMIN");

        Admin newAdmin = new Admin();
        newAdmin.setUsername("admin");
        newAdmin.setPassword("Admin@123");

        when(adminRepository.findByUsername("admin"))
                .thenReturn(existingAdmin);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> adminService.registerAdmin(newAdmin)
                );

        assertEquals(
                "Username already exists",
                exception.getMessage()
        );

        verify(adminRepository, never())
                .save(any(Admin.class));
    }

    @Test
    void shouldRegisterAdminSuccessfully() {

        Admin newAdmin = new Admin();
        newAdmin.setUsername("admin2");
        newAdmin.setPassword("Admin@123");

        when(adminRepository.findByUsername("admin2"))
                .thenReturn(null);

        when(passwordEncoder.encode("Admin@123"))
                .thenReturn("$2a$10$encodedPassword");

        when(adminRepository.save(any(Admin.class)))
                .thenAnswer(invocation -> {

                    Admin savedAdmin = invocation.getArgument(0);
                    savedAdmin.setId(2L);

                    return savedAdmin;
                });

        Admin result =
                adminService.registerAdmin(newAdmin);

        assertNotNull(result);

        assertEquals(
                2L,
                result.getId()
        );

        assertEquals(
                "admin2",
                result.getUsername()
        );

        assertEquals(
                "$2a$10$encodedPassword",
                result.getPassword()
        );

        assertEquals(
                "ADMIN",
                result.getRole()
        );

        verify(passwordEncoder)
                .encode("Admin@123");

        verify(adminRepository)
                .save(newAdmin);
    }
}