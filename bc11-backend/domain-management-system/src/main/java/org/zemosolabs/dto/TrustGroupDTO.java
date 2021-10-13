package org.zemosolabs.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class TrustGroupDTO {
    private UUID id;
    private String groupName;
    private String description;
    private String username;
    private UUID departmentId;
    private UUID collaboratorId;

    @Override
    public String toString() {
        return "";
    }
}
