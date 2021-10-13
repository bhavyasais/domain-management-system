package org.zemosolabs.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.UUID;

@Data
public class DepartmentDTO {

    private UUID id;

    @JsonProperty(value = "name")
    private String departmentName;

    @JsonProperty(value = "description")
    private String description;

    @JsonProperty(value = "created_by")
    private String username;
}
