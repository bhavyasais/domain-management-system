package com.notifications.clearedin.service;

import com.notifications.clearedin.dto.Notify;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Date;
import java.util.Properties;

@Service
public class EmailService {

    Logger logger = LoggerFactory.getLogger(EmailService.class);

    public boolean triggerEmail(Notify request) throws MessagingException {
        logger.info("Entered in to triggerEmail()");
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("marripavan11@gmail.com", "Zemoso@1305");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(request.getFrom(), false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(request.getTo()));
        msg.setSubject(request.getSubject());
        msg.setContent(request.getBody(), "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(request.getBody(), "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        msg.setContent(multipart);
        Transport.send(msg);
        logger.info("Exit from triggerEmail()");
        return true;
    }

}
