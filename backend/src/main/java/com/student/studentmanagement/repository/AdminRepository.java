package com.student.studentmanagement.repository;

import com.student.studentmanagement.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByUsername(String username);

}