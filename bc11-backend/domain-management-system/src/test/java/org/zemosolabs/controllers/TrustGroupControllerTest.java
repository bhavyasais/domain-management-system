package org.zemosolabs.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.zemosolabs.dto.TrustGroupDTO;
import org.zemosolabs.services.TrustGroupService;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TrustGroupController.class)
class TrustGroupControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockBean
    TrustGroupService trustGroupService;
    List<TrustGroupDTO> trustGroupDTOList;

    @BeforeEach
    void setUp(){
        trustGroupDTOList = new ArrayList<>();
        trustGroupDTOList.add(new TrustGroupDTO());
    }

    @Test
    void getTrustGroups() throws Exception{
        when(trustGroupService.getTrustGroups()).thenReturn(trustGroupDTOList);
        this.mockMvc.perform(get("/api/v1/trust-groups")).andExpect(status().isOk()).andExpect(jsonPath("$.size()",is(trustGroupDTOList.size())));
    }
    @Test
    void addTrustGroup() throws Exception{
        when(trustGroupService.addTrustGroup(any(TrustGroupDTO.class))).thenReturn(new TrustGroupDTO());
        this.mockMvc.perform(post("/api/v1/trust-groups").contentType(MediaType.APPLICATION_JSON).content("{\n" +
                "    \"groupName\" : \"Sunil Custom Group\",\n" +
                "    \"description\" : \"Testing\",\n" +
                "    \"username\" : \"Pavan Marri\"\n" +
                "}")).andExpect(status().isOk());
    }

    @Test
    void editTrustGroup() throws Exception{
        when(trustGroupService.editTrustGroup(any(TrustGroupDTO.class))).thenReturn(new TrustGroupDTO());
        this.mockMvc.perform(put("/api/v1/trust-groups").contentType(MediaType.APPLICATION_JSON).content("{\n" +
                "    \"groupName\" : \"Sunil Custom Group\",\n" +
                "    \"description\" : \"Testing\",\n" +
                "    \"username\" : \"Pavan Marri\"\n" +
                "}")).andExpect(status().isOk());
    }
}
