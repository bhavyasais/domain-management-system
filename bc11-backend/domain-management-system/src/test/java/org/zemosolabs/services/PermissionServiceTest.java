package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.AccessPermissionTypesDTO;
import org.zemosolabs.mapper.AccessPermissionTypesMapper;
import org.zemosolabs.model.AccessPermissionTypes;
import org.zemosolabs.repository.PermissionRepository;
import org.zemosolabs.services.impl.PermissionServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class PermissionServiceTest {
    PermissionRepository permissionRepository = mock(PermissionRepository.class);
    AccessPermissionTypesMapper accessPermissionTypesMapper = mock(AccessPermissionTypesMapper.class);

    PermissionService permissionService = new PermissionServiceImpl(permissionRepository,accessPermissionTypesMapper);

    @Test
     void getAllPermissions() throws  Exception{
        AccessPermissionTypes accessPermissionTypes = new AccessPermissionTypes();
        accessPermissionTypes.setId(UUID.randomUUID());
        accessPermissionTypes.setName("test");

        AccessPermissionTypesDTO accessPermissionTypesDTO = new AccessPermissionTypesDTO();
        accessPermissionTypesDTO.setId(accessPermissionTypes.getId());
        accessPermissionTypesDTO.setName(accessPermissionTypes.getName());
        List<AccessPermissionTypes> accessPermissionTypesList = new ArrayList<>();
        accessPermissionTypesList.add(accessPermissionTypes);

        when(permissionRepository.findAll()).thenReturn(accessPermissionTypesList);
        when(accessPermissionTypesMapper.entityToDto(accessPermissionTypes)).thenReturn(accessPermissionTypesDTO);
        List<AccessPermissionTypesDTO> accessPermissionTypesDTOList = permissionService.getAllPermissionTypes();
        Assert.assertNotNull(accessPermissionTypesDTOList);
        Assert.assertEquals("test", accessPermissionTypesDTOList.get(0).getName());
    }
}
