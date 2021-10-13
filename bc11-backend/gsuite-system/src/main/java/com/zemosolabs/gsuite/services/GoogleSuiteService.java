package com.zemosolabs.gsuite.services;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.google.api.services.drive.model.Permission;
import com.zemosolabs.gsuite.GSuiteClient;
import com.zemosolabs.gsuite.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
@Primary
public class GoogleSuiteService implements Collaborator {
    private static final Logger logger = LoggerFactory.getLogger(GoogleSuiteService.class);
    private  GSuiteClient gSuiteClient = new GSuiteClient();

    private static Drive drive ;
    private static HashMap<String, String> filesList = new HashMap<>();

    public GoogleSuiteService() {
        super();
    }

    public List<String> getFiles(){
        FileList fileList;
        try {
            fileList = drive.files().list().setFields("files(id,name,thumbnailLink)").execute();
            for (File file : fileList.getFiles()) {
                logger.info(file.getName() );
                logger.info(file.getId());
            }
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        return Collections.emptyList();
    }

   static   {
        filesList.put("Sales", "1p5rQQMq9OhdQ05iI51sT9FavMb2YRmnhAiz9AElKTPs");
        filesList.put("Legal", "1p5rQQMq9OhdQ05iI51sT9FavMb2YRmnhAiz9AElKTPse");
        filesList.put("Development", "1p5rQQMq9OhdQ05iI51sT9FavMb2YRmnhAiz9AElKTPs");
    }

    public boolean changeUserPermissions(String departmentName, List<String> clients, String permissionType, String type) {
        boolean status = false;
        if( filesList.get(departmentName) != null ) {
            String fileId = filesList.get(departmentName);
            Permission permission = new Permission();
            permission.setType(type);
            permission.setEmailAddress(clients.get(0));
            permission.setRole(permissionType);
            try {
                Permission permissionStatus;
                if(permissionType.equals(AppConstants.OWNER)) {
                    permissionStatus = drive.permissions().create(fileId, permission).setTransferOwnership(true).execute();
                } else {
                    permissionStatus = drive.permissions().create(fileId, permission).execute();
                }
                if(permissionStatus != null) status = true;
            } catch (IOException e) {
                logger.error(e.getMessage());
            }
        }
        return status;
    }

    public boolean changeDomainPermissions(String departmentName, List<String> clients, String permissionType, String type) {
        boolean status = false;
        if( filesList.get(departmentName) != null ) {
            for(String domain: clients) {
                String fileId = filesList.get(departmentName);
                Permission permission = new Permission();
                permission.setType(type);
                permission.setDomain(domain);
                permission.setRole(permissionType);
                try {
                    Permission execute = drive.permissions().create(fileId, permission).execute();
                    if(execute != null) status = true;
                } catch (IOException e) {
                    logger.error("Updating the Permissions in GSuite is failed for {}",domain);
                    logger.error(e.getMessage());
                }
            }
        }
        return status;
    }

    public boolean validateRequest(String type, String permissionType) {
        return (type.equals(AppConstants.USER) || type.equals(AppConstants.DOMAIN)) && (permissionType.equals(AppConstants.READER) || permissionType.equals(AppConstants.COMMENTER) ||
                permissionType.equals(AppConstants.WRITER)) || permissionType.equals(AppConstants.FILE_ORGANIZER) || permissionType.equals(AppConstants.ORGANIZER) ||
                permissionType.equals(AppConstants.OWNER);
    }
    public void activateGoogleSuiteService(final String authCode) throws IOException {
        gSuiteClient.createDriveObject(authCode);
        drive =  gSuiteClient.getDriveObj();
    }
}

