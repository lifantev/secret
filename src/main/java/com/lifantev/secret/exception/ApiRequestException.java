package com.lifantev.secret.exception;

public class ApiRequestException extends RuntimeException {

    public ApiRequestException(String message) {
        super(message);
    }

    public ApiRequestException(Throwable cause) {
        super(cause);
    }
}
