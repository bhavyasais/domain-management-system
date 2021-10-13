package org.zemosolabs.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.zemosolabs.dto.AccessPermissionTypesDTO;
import org.zemosolabs.dto.PermissionGrantDTO;
import org.zemosolabs.model.AccessPermissionTypes;
import org.zemosolabs.model.TrustGroup;
import org.zemosolabs.services.PermissionGrantService;
import org.zemosolabs.services.PermissionService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PermissionGrantController.class)
class PermissionGrantControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockBean
    PermissionService permissionService;
    @MockBean
    PermissionGrantService permissionGrantService;

    private List<PermissionGrantDTO> permissionGrantDTOList;
    private List<AccessPermissionTypesDTO> accessPermissionTypesDTOList;

    @BeforeEach
    void setUp(){
        permissionGrantDTOList = new ArrayList<>();
        accessPermissionTypesDTOList = new ArrayList<>();
        permissionGrantDTOList.add(new PermissionGrantDTO());
        accessPermissionTypesDTOList.add(new AccessPermissionTypesDTO());
    }

    @Test
    void getPermissions() throws Exception{
        when(permissionService.getAllPermissionTypes()).thenReturn(accessPermissionTypesDTOList);
        this.mockMvc.perform(get("/api/v1/permissions")).andExpect(status().isOk());
    }

    @Test
    void getPermissionGrant() throws Exception{
        when(permissionGrantService.getAllPermissions(UUID.randomUUID(),UUID.randomUUID())).thenReturn(permissionGrantDTOList);
        this.mockMvc.perform(get("/api/v1/permission-grant").param("collaborators_id","7e7f67f6-debf-4a0f-a73c-17ba0f89f50a").param("departments_id","2004639b-62a9-418f-beeb-6cb63d8ec56d")).andExpect(status().isOk());
    }

    @Test
    void updatePermission() throws Exception{
        AccessPermissionTypes accessPermissionTypes = new AccessPermissionTypes();
        accessPermissionTypes.setName("Access");
        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setGroupName("Trust Group");
        PermissionGrantDTO permissionGrantDTO = new PermissionGrantDTO();
        permissionGrantDTO.setPermissionType("writer");
        permissionGrantDTO.setTrustGroup(trustGroup);
        permissionGrantDTO.setAccessPermissionTypes(accessPermissionTypes);
        when(permissionGrantService.updatePermissions(any(PermissionGrantDTO.class))).thenReturn(permissionGrantDTO);
        String requestBody = new ObjectMapper().writeValueAsString(permissionGrantDTO);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/permission-grant")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody);
        mockMvc.perform(requestBuilder).andExpect(status().isOk()).andReturn();

    }
}
