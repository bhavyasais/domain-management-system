package com.zemosolabs.gsuite.services;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class DropboxService implements Collaborator {

    @Override
    public List<String> getFiles() {
        return Collections.emptyList();
    }

    @Override
    public boolean changeUserPermissions(String departmentName, List<String> clients, String permissionType, String type) {
        return false;
    }

    @Override
    public boolean changeDomainPermissions(String departmentName, List<String> clients, String permissionType, String type) {
        return false;
    }

    @Override
    public boolean validateRequest(String type, String permissionType) {
        return false;
    }
}
