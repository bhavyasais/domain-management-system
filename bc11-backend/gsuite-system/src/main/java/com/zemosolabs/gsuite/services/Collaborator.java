package com.zemosolabs.gsuite.services;

import java.util.List;

public interface Collaborator {
    List<String> getFiles();
    boolean changeUserPermissions(String departmentName, List<String> clients, String permissionType, String type);
    boolean changeDomainPermissions(String departmentName, List<String> clients, String permissionType, String type);
    boolean validateRequest(String type, String permissionType);
}
