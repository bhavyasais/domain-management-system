package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.DomainTrustGroupDTO;
import org.zemosolabs.model.DomainTrustGroup;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomainTrustGroupMapper {

    public DomainTrustGroupDTO entityToDto(DomainTrustGroup domainTrustGroup){
        DomainTrustGroupDTO dto = new DomainTrustGroupDTO();
        dto.setId(domainTrustGroup.getId());
        dto.setDomain(domainTrustGroup.getDomain());
        dto.setDomainsId(domainTrustGroup.getDomain().getId());
        dto.setAddress(domainTrustGroup.getDomain().getAddress());
        dto.setName(domainTrustGroup.getDomain().getName());
        dto.setTrustScore(domainTrustGroup.getDomain().getTrustScore());
        dto.setRelationship(domainTrustGroup.getDomain().getRelationship());
        dto.setTrustGroup(domainTrustGroup.getTrustGroup());
        dto.setTrustGroupsId(domainTrustGroup.getTrustGroup().getId());
        dto.setTrustGroupName(domainTrustGroup.getTrustGroup().getGroupName());
        dto.setDepartmentsId(domainTrustGroup.getDepartmentsId());
        dto.setCollaboratorsId(domainTrustGroup.getCollaboratorsId());
        return dto;
    }

    public List<DomainTrustGroupDTO> entityToDto(List<DomainTrustGroup> domainTrustGroups){
        return domainTrustGroups.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public DomainTrustGroup dtoToEntity(DomainTrustGroupDTO domainTrustGroupDTO){
        DomainTrustGroup domainTrustGroup = new DomainTrustGroup();
        domainTrustGroup.setId(domainTrustGroupDTO.getId());
        domainTrustGroup.setDomain(domainTrustGroupDTO.getDomain());
        domainTrustGroup.setTrustGroup(domainTrustGroupDTO.getTrustGroup());
        domainTrustGroup.setDepartmentsId(domainTrustGroupDTO.getDepartmentsId());
        domainTrustGroup.setCollaboratorsId(domainTrustGroupDTO.getCollaboratorsId());
        return domainTrustGroup;
    }

    public List<DomainTrustGroup> dtoToEntity(List<DomainTrustGroupDTO> domainTrustGroupDTOS){
        return domainTrustGroupDTOS.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }
}
