package com.student.studentmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course courseDetails;

    @Min(value = 16, message = "Age must be at least 16")
    private int age;

    public Student() {
    }

    public Student(
            Long id,
            String name,
            String email,
            Course courseDetails,
            int age
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.courseDetails = courseDetails;
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Course getCourseDetails() {
        return courseDetails;
    }

    public void setCourseDetails(Course courseDetails) {
        this.courseDetails = courseDetails;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}