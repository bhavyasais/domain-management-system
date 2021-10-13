package org.zemosolabs.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.zemosolabs.model.AccessPermissionTypes;
import org.zemosolabs.model.TrustGroup;

import javax.persistence.Id;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PermissionGrantDTO {

    @Id
    private UUID id;

    @JsonProperty("is_active")
    private Boolean isActive;

    @JsonProperty("permission_type")
    private String permissionType;

    public String getPermissionType(){
        return accessPermissionTypes.getName();
    }

    @JsonProperty("trust_group_name")
    private String trustGroupName;

    public String getTrustGroupName(){
        return trustGroup.getGroupName();
    }

    @JsonProperty("collaborators_id")
    private UUID collaboratorsId;

    @JsonProperty("departments_id")
    private UUID departmentsId;

    @JsonIgnore
    //@JsonBackReference(value = "trust-groups")
    private TrustGroup trustGroup;

    @JsonIgnore
    //@JsonBackReference(value = "permissions")
    private AccessPermissionTypes accessPermissionTypes;

    @JsonProperty("access_permission_types_id")
    private UUID accessPermissionTypesId;

    @JsonProperty("trust_groups_id")
    private UUID trustGroupsId;

    @JsonProperty("created_by")
    @JsonIgnore
    private String createdBy;

    @JsonProperty("created_at")
    @JsonIgnore
    private Date createdAt;

    @JsonProperty("updated_by")
    @JsonIgnore
    private String updatedBy;

    @JsonProperty("updated_at")
    @JsonIgnore
    private Date updatedAt;

    @Override
    public String toString() {
        return "";
    }
}
