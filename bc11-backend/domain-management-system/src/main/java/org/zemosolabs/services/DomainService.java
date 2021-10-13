package org.zemosolabs.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONException;
import org.zemosolabs.dto.DomainDTO;
import org.zemosolabs.model.Domain;

import java.util.List;
import java.util.UUID;

public interface DomainService {
    List<DomainDTO> getDomains();
    List<DomainDTO> getDomains(UUID collaboratorsId, UUID departmentId);
    DomainDTO addDomain(DomainDTO domainDTO);
    Domain updateDomain(DomainDTO domainDTO);
    void callCollaborator(List<String> domainNames, UUID departmentId, UUID trustGroupsId) throws JSONException, JsonProcessingException;
    void updateDomainInCollaborator(UUID id, String domainName);
    void updateDomainTrustGroup(UUID departmentId, UUID domainTrustGroupId) throws JSONException;
}
