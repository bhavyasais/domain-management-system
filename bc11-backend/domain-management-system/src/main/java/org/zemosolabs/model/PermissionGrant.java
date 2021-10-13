package org.zemosolabs.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "permission_mappings")
public class PermissionGrant {

    @Id
    @GeneratedValue
    @Column(name = "id", unique = true, updatable = false)
    private UUID id;

    @Column(name = "is_active")
    private Boolean isActive;

    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "created_by")
    private String createdBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @JsonBackReference(value = "permissions")
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "access_permission_types_id", nullable = false)
    private AccessPermissionTypes accessPermissionTypes;

    @JsonBackReference(value = "trust-groups")
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "trust_groups_id", nullable = false)
    private TrustGroup trustGroup;

    @JoinColumn(name = "departments_id", nullable = false)
    private UUID departmentsId;

    @JoinColumn(name = "collaborators_id", nullable = false)
    private UUID collaboratorsId;

    @Override
    public String toString() {
        return "";
    }
}
