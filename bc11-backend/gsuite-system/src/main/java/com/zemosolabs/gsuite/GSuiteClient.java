package com.zemosolabs.gsuite;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.List;

public class GSuiteClient {

    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);
    private static final String APPLICATION_NAME = "Google Drive API Acmeglobal";
    private String refreshToken;
    Drive drive;


    public Drive getDriveObj() {
        return drive;
    }

    public void createDriveObject(final String authCode) throws IOException {
        InputStream in = new ClassPathResource("client_secret.json").getInputStream();
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JacksonFactory.getDefaultInstance(),new InputStreamReader(in));
        GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(new NetHttpTransport(),JacksonFactory.getDefaultInstance(),"https://oauth2.googleapis.com/token",clientSecrets.getDetails().getClientId(),clientSecrets.getDetails().getClientSecret(),authCode,"http://localhost:8081").execute();
        String accessToken =  tokenResponse.getAccessToken();
        refreshToken= tokenResponse.getRefreshToken();
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken) ;
        drive = new Drive.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance(), credential)
                        .setApplicationName("Auth Code Exchange Demo")
                        .build();

    }

}
