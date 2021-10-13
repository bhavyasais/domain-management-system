package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.PermissionGrantDTO;
import org.zemosolabs.model.PermissionGrant;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionGrantMapper {

    public PermissionGrantDTO entityToDto(PermissionGrant permissionGrant){
        PermissionGrantDTO dto = new PermissionGrantDTO();
        dto.setId(permissionGrant.getId());
        dto.setIsActive(permissionGrant.getIsActive());
        dto.setAccessPermissionTypes(permissionGrant.getAccessPermissionTypes());
        dto.setAccessPermissionTypesId(permissionGrant.getAccessPermissionTypes().getId());
        dto.setPermissionType(permissionGrant.getAccessPermissionTypes().getName());
        dto.setTrustGroup(permissionGrant.getTrustGroup());
        dto.setTrustGroupsId(permissionGrant.getTrustGroup().getId());
        dto.setTrustGroupName(permissionGrant.getTrustGroup().getGroupName());
        dto.setDepartmentsId(permissionGrant.getDepartmentsId());
        dto.setCollaboratorsId(permissionGrant.getCollaboratorsId());
        return dto;
    }

    public List<PermissionGrantDTO> entityToDto(List<PermissionGrant> permissionGrants){
        return permissionGrants.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public PermissionGrant dtoToEntity(PermissionGrantDTO permissionGrantDTO){
        PermissionGrant permissionGrant = new PermissionGrant();
        permissionGrant.setId(permissionGrantDTO.getId());
        permissionGrant.setIsActive(permissionGrantDTO.getIsActive());
        permissionGrant.setCreatedBy(permissionGrantDTO.getCreatedBy());
        permissionGrant.setCreatedAt(permissionGrantDTO.getCreatedAt());
        permissionGrant.setUpdatedBy(permissionGrantDTO.getUpdatedBy());
        permissionGrant.setUpdatedAt(permissionGrantDTO.getUpdatedAt());
        permissionGrant.setAccessPermissionTypes(permissionGrantDTO.getAccessPermissionTypes());
        permissionGrant.setTrustGroup(permissionGrantDTO.getTrustGroup());
        permissionGrant.setDepartmentsId(permissionGrantDTO.getDepartmentsId());
        permissionGrant.setCollaboratorsId(permissionGrantDTO.getCollaboratorsId());
        return permissionGrant;
    }

    public List<PermissionGrant> dtoToEntity(List<PermissionGrantDTO> permissionGrantDTOList){
        return permissionGrantDTOList.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }
}
