package org.zemosolabs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name="departments")
public class Department {

    @Id
    @GeneratedValue
    @Column(name="id", updatable = false, unique = true)
    private UUID id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "created_at", nullable = false)
    @JsonIgnore
    private Date createdAt;

    @Column(name = "created_by", nullable = false)
    @JsonIgnore
    private String createdBy;

    @Column(name = "name", nullable = false)
    @JsonProperty(value = "department_name")
    private String departmentName;

}
