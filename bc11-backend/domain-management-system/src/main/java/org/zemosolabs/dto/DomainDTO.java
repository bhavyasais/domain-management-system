package org.zemosolabs.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DomainDTO {
    private UUID id;
    @JsonProperty(value = "domain_name")
    private String domainName;
    private String address;
    private String relationship;
    @JsonProperty(value = "trust_score")
    private int trustScore;
    @JsonIgnore
    private boolean isActive;
    @JsonIgnore
    private Date createdAt;
    @JsonProperty(value = "created_by")
    private String createdBy;
    @JsonIgnore
    private Date updatedAt;
    @JsonProperty(value = "username")
    private String updatedBy;
    @JsonProperty(value = "departments_id")
    private UUID departmentsId;
    @JsonProperty(value = "collaborators_id")
    private UUID collaboratorsId;
    @JsonProperty(value = "trust_groups_id")
    private UUID trustGroupsId;
    private String trustGroupName;
    private UUID domainTrustGroupId;

    @Override
    public String toString() {
        return "";
    }
}
