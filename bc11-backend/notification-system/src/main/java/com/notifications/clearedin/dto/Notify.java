package com.notifications.clearedin.dto;

import lombok.Data;

@Data
public class Notify {
    private String from;
    private String to;
    private String subject;
    private String body;
}
