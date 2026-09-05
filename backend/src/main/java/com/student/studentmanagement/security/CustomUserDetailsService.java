package com.student.studentmanagement.security;

import com.student.studentmanagement.entity.Admin;
import com.student.studentmanagement.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Admin admin = adminRepository.findByUsername(username);

        if (admin == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return User.builder()
                .username(admin.getUsername())
                .password(admin.getPassword())
                .roles(admin.getRole())
                .build();
    }
}