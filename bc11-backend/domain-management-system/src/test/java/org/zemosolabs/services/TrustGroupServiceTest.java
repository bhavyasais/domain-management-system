package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.TrustGroupDTO;
import org.zemosolabs.mapper.PermissionGrantMapper;
import org.zemosolabs.mapper.TrustGroupMapper;
import org.zemosolabs.model.AccessPermissionTypes;
import org.zemosolabs.model.Collaborator;
import org.zemosolabs.model.Department;
import org.zemosolabs.model.TrustGroup;
import org.zemosolabs.repository.*;
import org.zemosolabs.services.impl.TrustGroupServiceImpl;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class TrustGroupServiceTest {

    TrustGroupRepository trustGroupRepository = mock(TrustGroupRepository.class);
    AccessPermissionsRepository accessPermissionsRepository = mock(AccessPermissionsRepository.class);
    PermissionGrantRepository permissionGrantRepository = mock(PermissionGrantRepository.class);
    CollaboratorRepository collaboratorRepository = mock(CollaboratorRepository.class);
    DepartmentRepository departmentRepository = mock(DepartmentRepository.class);

    TrustGroupService trustGroupService = new TrustGroupServiceImpl(trustGroupRepository,new TrustGroupMapper(),accessPermissionsRepository,new PermissionGrantMapper(),permissionGrantRepository,collaboratorRepository,departmentRepository);

    @Test
     void getTrustGroups() throws  Exception{
        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setId(UUID.randomUUID());
        trustGroup.setGroupName("test");
        List<TrustGroup> trustGroupList = new ArrayList<>();
        trustGroupList.add(trustGroup);
        when(trustGroupRepository.findAll()).thenReturn(trustGroupList);
        List<TrustGroupDTO> trustGroupDTOList = trustGroupService.getTrustGroups();
        Assert.assertNotNull(trustGroupDTOList);
        Assert.assertEquals("test", trustGroupDTOList.get(0).getGroupName());
    }

    @Test
     void addTrustGroup() throws  Exception{
        TrustGroupDTO trustGroupDTO = new TrustGroupDTO();
        trustGroupDTO.setId(UUID.randomUUID());
        trustGroupDTO.setGroupName("test");
        trustGroupDTO.setDescription("desc");
        trustGroupDTO.setUsername("user");

        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setId(UUID.randomUUID());
        trustGroup.setGroupName("test");
        trustGroup.setDescription("desc");
        trustGroup.setCreatedBy(trustGroupDTO.getUsername());
        trustGroup.setUpdatedBy(trustGroupDTO.getUsername());
        trustGroup.setUpdatedAt(new Date());
        trustGroup.setCreatedAt(new Date());

        Collaborator collaborator = new Collaborator();
        Department department = new Department();
        AccessPermissionTypes accessPermissionTypes = new AccessPermissionTypes();

        List<Collaborator> collaboratorList = new ArrayList<>();
        List<Department> departmentList = new ArrayList<>();
        List<AccessPermissionTypes> accessPermissionTypesList =  new ArrayList<>();
        collaboratorList.add(collaborator);
        departmentList.add(department);
        accessPermissionTypesList.add(accessPermissionTypes);

        List<TrustGroup> trustGroupList = new ArrayList<>();
        trustGroupList.add(trustGroup);

        when(trustGroupRepository.save(any())).thenReturn(trustGroup);
        when(trustGroupRepository.findById(any())).thenReturn(Optional.of(trustGroup));
        when(collaboratorRepository.findAll()).thenReturn(collaboratorList);
        when(departmentRepository.findAll()).thenReturn(departmentList);

        TrustGroupDTO trustGroupDTO1 = trustGroupService.addTrustGroup(trustGroupDTO);
        Assert.assertNotNull(trustGroupDTO1);
        Assert.assertEquals("test", trustGroupDTO1.getGroupName());
    }

    @Test
     void editTrustGroup() throws Exception{
        TrustGroupDTO trustGroupDTO = new TrustGroupDTO();
        trustGroupDTO.setId(UUID.randomUUID());
        trustGroupDTO.setGroupName("test");
        trustGroupDTO.setDescription("desc");
        trustGroupDTO.setUsername("user");

        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setId(UUID.randomUUID());
        trustGroup.setGroupName("test");
        trustGroup.setDescription("desc");
        trustGroup.setCreatedBy(trustGroupDTO.getUsername());
        trustGroup.setUpdatedBy(trustGroupDTO.getUsername());
        trustGroup.setUpdatedAt(new Date());
        trustGroup.setCreatedAt(new Date());

        when(trustGroupRepository.findById(any())).thenReturn(Optional.of(trustGroup));
        when(trustGroupRepository.save(any())).thenReturn(trustGroup);

        TrustGroupDTO trustGroupDTO1 = trustGroupService.editTrustGroup(trustGroupDTO);
        Assert.assertNotNull(trustGroupDTO1);
        Assert.assertEquals("test", trustGroupDTO1.getGroupName());


    }

}
