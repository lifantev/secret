package com.lifantev.secret.student;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;

    public StudentService(StudentDataAccessService studentDataAccessService) {
        this.studentDataAccessService = studentDataAccessService;
    }

    List<Student> getAllStudents() {
        throw new IllegalStateException();
        // TODO: delete exception throwing
        //return studentDataAccessService.selectAllStudents();
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        // TODO: Verify email

        studentDataAccessService.insertStudent(newStudentId, student);
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }
}