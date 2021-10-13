package org.zemosolabs.exception;
import lombok.Data;

import java.util.Date;

@Data
public class ErrorDetails {
    public ErrorDetails(Date timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }

    private Date timestamp;
    private String message;
}
