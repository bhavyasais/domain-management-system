package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.DepartmentDTO;
import org.zemosolabs.dto.DomainDTO;
import org.zemosolabs.model.Department;
import org.zemosolabs.model.Domain;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomainMapper {

    public List<DomainDTO> entityToDto(List<Domain> domains){
        return domains.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public DomainDTO entityToDto(Domain domain){
        DomainDTO domainDTO = new DomainDTO();
        domainDTO.setAddress(domain.getAddress());
        domainDTO.setDomainName(domain.getName());
        domainDTO.setTrustScore(domain.getTrustScore());
        domainDTO.setRelationship(domain.getRelationship());
        return domainDTO;
    }
}
