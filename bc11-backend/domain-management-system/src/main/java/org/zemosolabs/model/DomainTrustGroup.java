package org.zemosolabs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "domain_tg_mappings")
public class DomainTrustGroup {
    @Id
    @GeneratedValue
    @Column(name = "id", unique = true, updatable = false)
    private UUID id;

    @LastModifiedDate
    @Column(name = "action_at")
    @JsonProperty(value = "action_at")
    private Date actionAt;

    @Column(name = "action_by")
    @JsonProperty(value = "action_by")
    private String actionBy;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "domains_id")
    @JsonIgnore
    private Domain domain;

    public Domain getDomain(){
        return domain;
    }

    public void setDomain(Domain domain){
        this.domain = domain;
    }

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "trust_groups_id")
    @JsonIgnore
    private TrustGroup trustGroup;

    public TrustGroup getTrustGroup(){
        return trustGroup;
    }

    public void setTrustGroup(TrustGroup trustGroup){
        this.trustGroup = trustGroup;
    }

    @JoinColumn(name = "departments_id", nullable = false)
    @JsonProperty(value = "departments_id")
    private UUID departmentsId;

    @JoinColumn(name = "collaborators_id", nullable = false)
    @JsonProperty(value = "collaborators_id")
    private UUID collaboratorsId;

    @Override
    public String toString() {
        return "";
    }
}
