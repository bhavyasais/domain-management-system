package org.zemosolabs.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CollaboratorDTO {
    private UUID id;
    private String name;
    private String imageURL;
}
