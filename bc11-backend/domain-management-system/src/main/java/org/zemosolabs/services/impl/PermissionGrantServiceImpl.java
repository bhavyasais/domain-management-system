package org.zemosolabs.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zemosolabs.dto.PermissionGrantDTO;
import org.zemosolabs.mapper.PermissionGrantMapper;
import org.zemosolabs.model.PermissionGrant;
import org.zemosolabs.repository.PermissionGrantRepository;
import org.zemosolabs.services.PermissionGrantService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.zemosolabs.util.AppConstants.*;

@Service
@Slf4j
public class PermissionGrantServiceImpl implements PermissionGrantService {

    private final PermissionGrantRepository permissionGrantRepository;

    private final PermissionGrantMapper permissionGrantMapper;

    public PermissionGrantServiceImpl(PermissionGrantRepository permissionGrantRepository, PermissionGrantMapper permissionGrantMapper) {
        this.permissionGrantRepository = permissionGrantRepository;
        this.permissionGrantMapper = permissionGrantMapper;
    }

    @Autowired
    private DomainServiceImpl domainService;

    @Override
    public List<PermissionGrantDTO> getAllPermissions(UUID departmentId, UUID collaboratorId) {
        List<PermissionGrantDTO> permissionGrantDTOList = new ArrayList<>();
        permissionGrantRepository.findAllByCollaboratorsIdAndDepartmentsId(departmentId,collaboratorId).forEach(permissionGrant -> permissionGrantDTOList.add(permissionGrantMapper.entityToDto(permissionGrant)));
        return permissionGrantDTOList;
    }

    @Override
    public PermissionGrantDTO updatePermissions(PermissionGrantDTO permissionGrantDTO) {
        try {
            Optional<PermissionGrant> byId = permissionGrantRepository.findById(permissionGrantDTO.getId());
            if(byId.isPresent()) {
                PermissionGrant permissionGrant = byId.get();
                permissionGrant.setIsActive(permissionGrantDTO.getIsActive());
                permissionGrantRepository.save(permissionGrant);
                return permissionGrantMapper.entityToDto(permissionGrant);
            }
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            return null;
        }
        return new PermissionGrantDTO();
    }

    @Override
    public void callCollaboratorServiceToUpdatePermissions(PermissionGrantDTO permissionGrantDTO) {
        UUID departmentId = permissionGrantDTO.getDepartmentsId();
        UUID collaboratorId = permissionGrantDTO.getCollaboratorsId();
        UUID trustGroupId = permissionGrantDTO.getTrustGroupsId();

        List<PermissionGrant> allByCollaboratorsIdAndDepartmentsId = permissionGrantRepository.findAllByCollaboratorsIdAndDepartmentsIdAndIsActive(collaboratorId, departmentId, true);
        List<String> permissions = new ArrayList<>();
        for(PermissionGrant permissionGrant: allByCollaboratorsIdAndDepartmentsId) {
            if( permissionGrant.getTrustGroup().getId().equals(trustGroupId) ) {
                permissions.add(permissionGrant.getAccessPermissionTypes().getName());
            }
        }
        List<String> domains = domainService.getDomains(collaboratorId, departmentId, trustGroupId);
        if( permissions.contains(TRANSFER_OWNERSHIP) ) {
            domainService.callCollaboratorService(domains, departmentId, WRITER);
        } else if(permissions.contains(EDIT)) {
            domainService.callCollaboratorService(domains, departmentId, WRITER);
        } else if(permissions.contains(COMMENT)) {
            domainService.callCollaboratorService(domains, departmentId, COMMENTER);
        } else {
            domainService.callCollaboratorService(domains, departmentId, READER);
        }
    }

}
