package com.zemosolabs.gsuite.controllers;

import com.zemosolabs.gsuite.dto.CollabortorRequest;
import com.zemosolabs.gsuite.services.Collaborator;
import com.zemosolabs.gsuite.services.DropboxService;
import com.zemosolabs.gsuite.services.GoogleSuiteService;
import com.zemosolabs.gsuite.util.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Slf4j
public class CollaborationController {

    @Autowired
    Collaborator collaborator;

    @Autowired
    DropboxService dropboxService;

    @Autowired
    GoogleSuiteService googleSuiteService;


    private  String authCode;

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok(AppConstants.SUCCESS);
    }

    @PostMapping("/changePermissions")
    public ResponseEntity<Boolean> changePermissions(@Validated @RequestBody CollabortorRequest collabortorRequest){
        boolean status = false;
        // user or domain
        String type = collabortorRequest.getType();
        // check the hashmap
        String departmentName = collabortorRequest.getDepartmentName();
        // array of domains or a single user
        List<String> clients = collabortorRequest.getClients();
        // owner or organizer or fileOrganizer or writer or commenter or reader
        String permissionType = collabortorRequest.getPermissionType();
        // integrationType to decide the collaborator
        String integrationType = collabortorRequest.getIntegrationType();

        if(StringUtils.isNotEmpty(integrationType) && integrationType.equals("dropbox")) {
            collaborator = dropboxService;
        } else {
            collaborator = googleSuiteService;
        }
        if( collaborator.validateRequest(type, permissionType) ) {
            if(type.equals(AppConstants.USER)) {
                status = collaborator.changeUserPermissions(departmentName, clients, permissionType, type);
            } else if(type.equals(AppConstants.DOMAIN)) {
                status = collaborator.changeDomainPermissions(departmentName, clients, permissionType, type);
            }
        }
        if(status) {
            log.info("Permission to {} has been changed successfully to the request {}", permissionType ,collabortorRequest.getDepartmentName());
        }

        return ResponseEntity.ok(status);
    }
    @PutMapping("updateToken")
    public ResponseEntity<Boolean> fetchAuthorizationToken(@RequestParam final String authCode) throws IOException {
        this.authCode= authCode;
        googleSuiteService.activateGoogleSuiteService(authCode);
        return  ResponseEntity.ok(true);
    }
}
