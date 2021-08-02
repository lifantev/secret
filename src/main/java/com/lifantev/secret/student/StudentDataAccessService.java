package com.lifantev.secret.student;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {

        String sql = "SELECT student_id, first_name, last_name, email, gender FROM student";

        return jdbcTemplate.query(sql, mapStudentFromDp());
    }

    private RowMapper<Student> mapStudentFromDp() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");

            String genderStr = resultSet.getString("gender").toUpperCase(Locale.ROOT);
            Student.Gender gender = Student.Gender.valueOf(genderStr);

            return new Student(studentId, firstName, lastName, email, gender);
        };
    }
}
