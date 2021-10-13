package org.zemosolabs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="domains")
public class Domain {

    @Id
    @GeneratedValue
    @Column(name="id", updatable = false, unique = true)
    private UUID id;

    @Column(name="name")
    private String name;

    @Column(name="trust_score")
    @JsonProperty(value = "trust_score")
    private int trustScore;

    @Column(name = "address")
    private String address;

    @Column(name="relationship")
    private String relationship;

    @Column(name = "created_at")
    @CreatedDate
    @JsonIgnore
    private Date createdAt;

    @Column(name = "created_by")
    @JsonIgnore
    private String createdBy;

    @Column(name = "updated_at")
    @LastModifiedDate
    @JsonIgnore
    private Date updatedAt;

    @Column(name = "updated_by")
    @JsonIgnore
    private String updatedBy;

    @OneToMany(mappedBy = "domain", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DomainTrustGroup> domainTrustGroups;

    @Column(name = "is_active")
    @JsonProperty(value = "is_active")
    private boolean isActive;

    @Override
    public String toString() {
        return "";
    }

}