package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.AccessPermissionTypesDTO;
import org.zemosolabs.model.AccessPermissionTypes;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccessPermissionTypesMapper {

    public AccessPermissionTypesDTO entityToDto(AccessPermissionTypes accessPermissionTypes){
        AccessPermissionTypesDTO dto = new AccessPermissionTypesDTO();
        dto.setId(accessPermissionTypes.getId());
        dto.setName(accessPermissionTypes.getName());
        dto.setDescription(accessPermissionTypes.getDescription());
        return dto;
    }

    public List<AccessPermissionTypesDTO> entityToDto(List<AccessPermissionTypes> accessPermissionTypesList){
        return accessPermissionTypesList.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public AccessPermissionTypes dtoToEntity(AccessPermissionTypesDTO accessPermissionTypesDTO){
        AccessPermissionTypes accessPermissionTypes = new AccessPermissionTypes();
        accessPermissionTypes.setId(accessPermissionTypesDTO.getId());
        accessPermissionTypes.setName(accessPermissionTypesDTO.getName());
        accessPermissionTypes.setDescription(accessPermissionTypesDTO.getDescription());
        return accessPermissionTypes;
    }

    public List<AccessPermissionTypes> dtoToEntity(List<AccessPermissionTypesDTO> accessPermissionTypesDTOList){
        return accessPermissionTypesDTOList.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }
}
