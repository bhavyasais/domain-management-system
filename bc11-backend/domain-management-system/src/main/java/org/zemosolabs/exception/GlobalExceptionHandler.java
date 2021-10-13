package org.zemosolabs.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handle(Exception ex,
                                         HttpServletRequest request, HttpServletResponse response) {
        if (ex instanceof ResourceNotFoundException) {
            String detailMessage = ex.getMessage();
            ErrorDetails apiError = new ErrorDetails(new Date(), detailMessage);
            return new ResponseEntity<>(apiError, new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
        ErrorDetails apiError = new ErrorDetails(new Date(), HttpStatus.INTERNAL_SERVER_ERROR.toString());
        return new ResponseEntity<>(apiError,new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

