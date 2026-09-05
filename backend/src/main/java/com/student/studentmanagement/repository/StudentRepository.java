package com.student.studentmanagement.repository;

import com.student.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByName(String name);

    List<Student> findByCourseDetailsCourseName(String courseName);

    Student findByEmail(String email);

    boolean existsByCourseDetailsId(Long courseId);
}