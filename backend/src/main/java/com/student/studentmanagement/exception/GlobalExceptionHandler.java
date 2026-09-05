package com.student.studentmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Validation Errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        ));

        return new ResponseEntity<>(
                errors,
                HttpStatus.BAD_REQUEST
        );
    }


    // Runtime Errors
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(
            RuntimeException ex) {

        String message = ex.getMessage();

        // Course has enrolled students
        if (message != null &&
                message.contains(
                        "Cannot delete this course because students are enrolled"
                )) {

            return new ResponseEntity<>(
                    message,
                    HttpStatus.CONFLICT
            );
        }

        // Course not found
        if (message != null &&
                message.contains("Course not found")) {

            return new ResponseEntity<>(
                    message,
                    HttpStatus.NOT_FOUND
            );
        }

        // Other runtime errors
        return new ResponseEntity<>(
                "Error: " + message,
                HttpStatus.BAD_REQUEST
        );
    }


    // General Errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(
            Exception ex) {

        return new ResponseEntity<>(
                "Error: " + ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}