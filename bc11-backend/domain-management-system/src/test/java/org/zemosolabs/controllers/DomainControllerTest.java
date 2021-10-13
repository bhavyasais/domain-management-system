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
import org.zemosolabs.dto.DomainDTO;
import org.zemosolabs.dto.DomainTrustGroupDTO;
import org.zemosolabs.model.Domain;
import org.zemosolabs.model.TrustGroup;
import org.zemosolabs.services.DomainService;
import org.zemosolabs.services.DomainTrustService;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DomainController.class)
class DomainControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private DomainService domainService;
    @MockBean
    DomainTrustService domainTrustService;

    private List<DomainDTO> domainDTOList;

    @BeforeEach
    void setUp(){
        this.domainDTOList=new ArrayList<>();
        this.domainDTOList.add(new DomainDTO());
    }
    @Test
    void fetchAllDomains() throws Exception{
        when(domainService.getDomains()).thenReturn(domainDTOList);
        this.mockMvc.perform(get("/api/v1/alldomains")).andExpect(status().isOk()).andExpect(jsonPath("$.size()",is(domainDTOList.size())));
    }

    @Test
    void fetchDomains() throws Exception {
        when(domainService.getDomains(UUID.randomUUID(),UUID.randomUUID())).thenReturn(domainDTOList);
        this.mockMvc.perform(get("/api/v1/domains").param("collaborators_id","7e7f67f6-debf-4a0f-a73c-17ba0f89f50a").param("departments_id","2004639b-62a9-418f-beeb-6cb63d8ec56d")).andExpect(status().isOk());
    }

    @Test
    void addDomain() throws Exception {
        when(domainService.addDomain(any(DomainDTO.class))).thenReturn(domainDTOList.get(0));
        this.mockMvc.perform(post("/api/v1/domains").contentType(MediaType.APPLICATION_JSON).content("{\n" +
                "        \"domain_name\": \"Temp one1\",\n" +
                "        \"trust_score\": 500,\n" +
                "        \"address\" : \"City Some\",\n" +
                "        \"relationship\": \"donno\",\n" +
                "        \"created_by\" : \"Pavan Marri\",\n" +
                "        \"trust_groups_id\" : \"955147d1-c0ec-44b0-9d9b-c81d7cb75f33\",\n" +
                "        \"departments_id\" : \"cdfea095-f402-4525-ac0a-ab089ee62f4e\",\n" +
                "        \"collaborators_id\" : \"7e7f67f6-debf-4a0f-a73c-17ba0f89f50a\"\n" +
                "    }")).andExpect(status().isOk());
    }

    @Test
    void updateDomains() throws Exception{
        when(domainService.updateDomain(any(DomainDTO.class))).thenReturn(new Domain());
        this.mockMvc.perform(put("/api/v1/domains").contentType(MediaType.APPLICATION_JSON).content("{\n" +
                "    \"id\":\"4f2e9cab-76f5-420a-a800-194492371473\",\n" +
                "    \"trust_score\" : 10,\n" +
                "    \"relationship\" : \"unicorn\",\n" +
                "    \"domain_name\" : \"sky air ways\",\n" +
                "    \"username\": \"Ray Shield\"\n" +
                "}")).andExpect(status().isOk());

    }

    @Test
    void updateDomainTrustGroup() throws Exception{
        Domain domain = new Domain();
        domain.setName("domain");

        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setGroupName("Top 10");

        DomainTrustGroupDTO domainTrustGroupDTO = new DomainTrustGroupDTO();
        domainTrustGroupDTO.setAddress("zemosolabs.com");
        domainTrustGroupDTO.setName("test");
        domainTrustGroupDTO.setDomain(domain);
        domainTrustGroupDTO.setTrustGroup(trustGroup);

        when(domainTrustService.updateTrustGroup(any())).thenReturn(domainTrustGroupDTO);

        String requestBody = new ObjectMapper().writeValueAsString(domainTrustGroupDTO);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/domainTrustGroup")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody);

        mockMvc.perform(requestBuilder).andExpect(status().isOk()).andReturn();
    }

}
