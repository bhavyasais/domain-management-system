package com.notifications.clearedin.controllers;

import com.notifications.clearedin.dto.Notify;
import com.notifications.clearedin.service.EmailService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;


@RestController
@RequestMapping("/api/v1/notifications")
public class EmailController {

    Logger logger = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    EmailService emailService;

    @GetMapping("/test")
    @ApiOperation(value = "Test API",
            notes = "This API is used to just test the Service is UP or not")
    public String test() {
        return "success";
    }

    @PostMapping(value = "/sendEmail")
    @ApiOperation(value = "Send Email API",
            notes = "This API is used to Send the Email")
    public String sendEmail(@Validated @RequestBody Notify requestBody) throws IOException, MessagingException {
        logger.info("Entered into Send Email API");
        if( emailService.triggerEmail(requestBody) ) {
            logger.info("Exit from Send Email API");
            return "Email sent successfully";
        } else {
            logger.info("Exit from Send Email API");
            return "Something went wrong";
        }
    }
}
