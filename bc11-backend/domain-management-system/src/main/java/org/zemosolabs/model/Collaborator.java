package org.zemosolabs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name="collaborator_platforms")
public class Collaborator {

    @Id
    @Column(name = "id", nullable = false)
    @JsonProperty("id")
    private UUID collaboratorId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image_url", nullable = false)
    private String imageURL;

    @Column(name = "created_by", nullable = false)
    @JsonIgnore
    private String createdBy;

    @Column(name = "created_at", nullable = false)
    @JsonIgnore
    private Date createdAt;

    @Column(name = "updated_by", nullable = false)
    @JsonIgnore
    private String updatedBy;

    @Column(name = "updated_at", nullable = false)
    @JsonIgnore
    private Date updatedAt;

}
