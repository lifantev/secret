import fetch from "unfetch";

export const getAllStudents = () => fetch('localhost:8080/students')