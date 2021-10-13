package org.zemosolabs.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.zemosolabs.dto.AccessPermissionTypesDTO;
import org.zemosolabs.mapper.AccessPermissionTypesMapper;
import org.zemosolabs.repository.PermissionRepository;
import org.zemosolabs.services.PermissionService;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;

    private final AccessPermissionTypesMapper permissionTypesMapper;

    public PermissionServiceImpl(PermissionRepository permissionRepository, AccessPermissionTypesMapper permissionTypesMapper){
        this.permissionRepository = permissionRepository;
        this.permissionTypesMapper = permissionTypesMapper;
    }

    @Override
    public List<AccessPermissionTypesDTO> getAllPermissionTypes() {
        List<AccessPermissionTypesDTO> dtoList = new ArrayList<>();
        permissionRepository.findAll().forEach(accessPermissionTypes -> dtoList.add(permissionTypesMapper.entityToDto(accessPermissionTypes)));
        return dtoList;
    }
}
