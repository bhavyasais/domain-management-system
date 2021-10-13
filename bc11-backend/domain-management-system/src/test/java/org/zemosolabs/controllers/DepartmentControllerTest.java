package org.zemosolabs.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.zemosolabs.dto.DepartmentDTO;
import org.zemosolabs.services.DepartmentService;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DepartmentController.class)
class DepartmentControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    DepartmentService departmentService;

    private List<DepartmentDTO> departmentDTOList;

    @BeforeEach
    void setUp(){
        this.departmentDTOList = new ArrayList<>();
        this.departmentDTOList.add(new DepartmentDTO());
    }

    @Test
    void getDepartmentsSuccessfull() throws Exception{
        when(departmentService.getDepartments()).thenReturn(departmentDTOList);
        this.mockMvc.perform(get("/api/v1/departments")).andExpect(status().isOk()).andExpect(jsonPath("$.size()",is(departmentDTOList.size())));
    }

    @Test
    void addDepartment() throws Exception{
        when(departmentService.addDepartment(any(DepartmentDTO.class))).thenReturn(departmentDTOList.get(0));
        this.mockMvc.perform(post("/api/v1/departments").contentType(MediaType.APPLICATION_JSON).content("{\n" +
                "    \"name\": \"Some New Dept\",\n" +
                "    \"description\" : \"New Random Department\",\n" +
                "    \"created_by\" : \"Pavan Marri\"\n" +
                "}")).andExpect(status().isOk());
    }



}
