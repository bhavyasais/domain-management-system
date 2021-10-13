package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.TrustGroupDTO;
import org.zemosolabs.model.TrustGroup;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrustGroupMapper {

    public List<TrustGroupDTO> entityToDto(List<TrustGroup> trustGroups){
        return trustGroups.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public TrustGroupDTO entityToDto(TrustGroup trustGroup){
        TrustGroupDTO trustGroupDTO = new TrustGroupDTO();
        trustGroupDTO.setDescription(trustGroup.getDescription());
        trustGroupDTO.setGroupName(trustGroup.getGroupName());
        trustGroupDTO.setUsername(trustGroup.getCreatedBy());
        trustGroupDTO.setId(trustGroup.getId());
        return trustGroupDTO;
    }
}
