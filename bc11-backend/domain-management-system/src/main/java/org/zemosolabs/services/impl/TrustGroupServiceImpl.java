package org.zemosolabs.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.zemosolabs.dto.PermissionGrantDTO;
import org.zemosolabs.dto.TrustGroupDTO;
import org.zemosolabs.mapper.PermissionGrantMapper;
import org.zemosolabs.mapper.TrustGroupMapper;
import org.zemosolabs.model.*;
import org.zemosolabs.repository.*;
import org.zemosolabs.services.TrustGroupService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TrustGroupServiceImpl implements TrustGroupService {

    private final TrustGroupRepository trustGroupRepository;

    private final TrustGroupMapper trustGroupMapper;

    private final AccessPermissionsRepository accessPermissionsRepository;

    private final PermissionGrantMapper permissionGrantMapper;

    private final PermissionGrantRepository permissionGrantRepository;

    private final CollaboratorRepository collaboratorRepository;

    private final DepartmentRepository departmentRepository;

    public TrustGroupServiceImpl(TrustGroupRepository trustGroupRepository, TrustGroupMapper trustGroupMapper, AccessPermissionsRepository accessPermissionsRepository, PermissionGrantMapper permissionGrantMapper, PermissionGrantRepository permissionGrantRepository, CollaboratorRepository collaboratorRepository, DepartmentRepository departmentRepository) {
        this.trustGroupRepository = trustGroupRepository;
        this.trustGroupMapper = trustGroupMapper;
        this.accessPermissionsRepository = accessPermissionsRepository;
        this.permissionGrantMapper = permissionGrantMapper;
        this.permissionGrantRepository = permissionGrantRepository;
        this.collaboratorRepository = collaboratorRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<TrustGroupDTO> getTrustGroups() {
        List<TrustGroup> all = trustGroupRepository.findAll();
        return trustGroupMapper.entityToDto(all);
    }

    public TrustGroupDTO addTrustGroup(TrustGroupDTO trustGroupDTO) {
        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setGroupName(trustGroupDTO.getGroupName());
        trustGroup.setDescription(trustGroupDTO.getDescription());
        trustGroup.setCreatedAt(new Date());
        trustGroup.setCreatedBy(trustGroupDTO.getUsername());
        trustGroup.setUpdatedAt(new Date());
        trustGroup.setUpdatedBy(trustGroupDTO.getUsername());
        TrustGroup save = trustGroupRepository.save(trustGroup);
        TrustGroupDTO trustGroupDTO1 = trustGroupMapper.entityToDto(save);
        Optional<TrustGroup> byId = trustGroupRepository.findById(trustGroupDTO1.getId());
        List<Collaborator> collaborators = collaboratorRepository.findAll();
        List<Department> departments = departmentRepository.findAll();
        List<AccessPermissionTypes> all = (List<AccessPermissionTypes>) accessPermissionsRepository.findAll();
        for(Collaborator collaborator: collaborators) {
            for(Department department: departments) {
                for(AccessPermissionTypes accessPermissionTypes: all) {
                    PermissionGrantDTO permissionGrantDTO = new PermissionGrantDTO();
                    permissionGrantDTO.setIsActive(false);
                    permissionGrantDTO.setCreatedAt(new Date());
                    permissionGrantDTO.setCreatedBy(trustGroupDTO.getUsername());
                    permissionGrantDTO.setUpdatedAt(new Date());
                    permissionGrantDTO.setUpdatedBy(trustGroupDTO.getUsername());
                    permissionGrantDTO.setCreatedBy(trustGroupDTO.getUsername());
                    permissionGrantDTO.setAccessPermissionTypes(accessPermissionTypes);
                    if(byId.isPresent()) {
                        TrustGroup trustGroup1 = byId.get();
                        permissionGrantDTO.setTrustGroup(trustGroup1);
                    }
                    permissionGrantDTO.setDepartmentsId(department.getId());
                    permissionGrantDTO.setCollaboratorsId(collaborator.getCollaboratorId());
                    PermissionGrant permissionGrant = permissionGrantMapper.dtoToEntity(permissionGrantDTO);
                    permissionGrantRepository.save(permissionGrant);
                }
            }
        }
        return trustGroupDTO1;
    }

    @Override
    public TrustGroupDTO editTrustGroup(TrustGroupDTO trustGroupDTO) {
        Optional<TrustGroup> byId = trustGroupRepository.findById(trustGroupDTO.getId());
        if(byId.isPresent()) {
            TrustGroup trustGroup = byId.get();
            if(StringUtils.isNotEmpty(trustGroupDTO.getDescription())) {
                trustGroup.setDescription(trustGroupDTO.getDescription());
            }
            if(StringUtils.isNotEmpty(trustGroupDTO.getGroupName())) {
                trustGroup.setGroupName(trustGroupDTO.getGroupName());
            }
            trustGroup.setUpdatedBy(trustGroupDTO.getUsername());
            trustGroup.setUpdatedAt(new Date());
            TrustGroup save = trustGroupRepository.save(trustGroup);
            return trustGroupMapper.entityToDto(save);
        }
        return new TrustGroupDTO();
    }
}
