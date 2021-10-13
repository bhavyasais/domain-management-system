package org.zemosolabs.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.zemosolabs.model.Domain;
import org.zemosolabs.model.TrustGroup;

import javax.persistence.Id;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DomainTrustGroupDTO {

    @Id
    @JsonProperty("id")
    private UUID id;

    @JsonBackReference("domain")
    private Domain domain;

    @JsonBackReference("trust-group")
    private TrustGroup trustGroup;

    @JsonProperty("name")
    private String name;

    @JsonProperty("trust_score")
    private int trustScore;

    @JsonProperty("address")
    private String address;

    @JsonProperty("relationship")
    private String relationship;

    @JsonProperty("trust_group_name")
    private String trustGroupName;

    public String getTrustGroupName(){
        return trustGroup.getGroupName();
    }

    public String getName(){
        return domain.getName();
    }

    public String getAddress(){
        return domain.getAddress();
    }

    public String getRelationship(){
        return domain.getRelationship();
    }

    public int getTrustScore(){
        return domain.getTrustScore();
    }

    @JsonProperty("domains_id")
    private UUID domainsId;

    @JsonProperty("trust_groups_id")
    private UUID trustGroupsId;

    @JsonProperty("departments_id")
    private UUID departmentsId;

    @JsonProperty("collaborators_id")
    private UUID collaboratorsId;

    @Override
    public String toString() {
        return "";
    }
}
