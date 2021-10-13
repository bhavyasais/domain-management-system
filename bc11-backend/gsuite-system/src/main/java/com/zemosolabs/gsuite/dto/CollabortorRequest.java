package com.zemosolabs.gsuite.dto;

import lombok.Data;

import java.util.List;

@Data
public class CollabortorRequest {

    private String departmentName;
    private List<String> clients;
    private String type;
    private String permissionType;
    private String integrationType;

    @Override
    public String toString() {
        return "";
    }
}
