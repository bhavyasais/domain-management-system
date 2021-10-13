package org.zemosolabs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Data
@Entity
@Table(name = "trust_groups")
public class TrustGroup {

    @Id
    @GeneratedValue
    @Column(name = "id", unique = true, updatable = false)
    private UUID id;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "description")
    private String description;

    @CreatedDate
    @Column(name = "created_at")
    @JsonIgnore
    private Date createdAt;

    @Column(name = "created_by")
    @JsonIgnore
    private String createdBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    @JsonIgnore
    private Date updatedAt;

    @Column(name = "updated_by")
    @JsonIgnore
    private String updatedBy;

    // TODO : Please check the usage of this annotation @JsonManagedReference(value = "trust-group")
    @OneToMany(mappedBy = "trustGroup", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DomainTrustGroup> domainTrustGroups;

    // TODO : Please check the usage of this annotation @JsonManagedReference(value = "trust-groups")
    @OneToMany(mappedBy = "trustGroup", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PermissionGrant> permissionGrants;

}
