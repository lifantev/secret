package com.lifantev.secret.student;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;

    public StudentService(StudentDataAccessService studentDataAccessService) {
        this.studentDataAccessService = studentDataAccessService;
    }

    public List<Student> getAllStudents() {
        return studentDataAccessService.selectAllStudents();
    }
}