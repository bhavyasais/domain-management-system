package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.PermissionGrantDTO;
import org.zemosolabs.mapper.PermissionGrantMapper;
import org.zemosolabs.model.PermissionGrant;
import org.zemosolabs.repository.PermissionGrantRepository;
import org.zemosolabs.services.impl.PermissionGrantServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class PermissionGrantServiceTest {

    PermissionGrantRepository permissionGrantRepository =  mock(PermissionGrantRepository.class);
    PermissionGrantMapper permissionGrantMapper = mock(PermissionGrantMapper.class);

    PermissionGrantService permissionGrantService = new PermissionGrantServiceImpl(permissionGrantRepository,permissionGrantMapper);

    @Test
     void getAllPermissions(){

        PermissionGrant permissionGrant = new PermissionGrant();
        PermissionGrantDTO permissionGrantDTO = new PermissionGrantDTO();
        List<PermissionGrant> permissionGrantList = new ArrayList<>();
        permissionGrantDTO.setIsActive(true);
        permissionGrantList.add(permissionGrant);

        when(permissionGrantRepository.findAllByCollaboratorsIdAndDepartmentsId(any(),any())).thenReturn(permissionGrantList);
        when(permissionGrantMapper.entityToDto(permissionGrant)).thenReturn(permissionGrantDTO);
        List<PermissionGrantDTO> permissionGrantDTOList = permissionGrantService.getAllPermissions(UUID.randomUUID(),UUID.randomUUID());

        Assert.assertNotNull(permissionGrantDTOList);
        Assert.assertTrue(permissionGrantDTOList.get(0).getIsActive());
    }

    @Test
     void updatePermissions(){

        PermissionGrant permissionGrant = new PermissionGrant();
        PermissionGrantDTO permissionGrantDTO = new PermissionGrantDTO();
        List<PermissionGrant> permissionGrantList = new ArrayList<>();
        permissionGrantDTO.setIsActive(true);
        permissionGrantList.add(permissionGrant);

        Optional<PermissionGrant> optionalPermissionGrant =Optional.of(permissionGrant);

        when(permissionGrantRepository.findById(any())).thenReturn(optionalPermissionGrant);
        when(permissionGrantMapper.entityToDto(permissionGrant)).thenReturn(permissionGrantDTO);
        PermissionGrantDTO permissionGrantDTO1 = permissionGrantService.updatePermissions(permissionGrantDTO);

        Assert.assertNotNull(permissionGrantDTO1);
        Assert.assertTrue(permissionGrantDTO1.getIsActive());
    }
}
