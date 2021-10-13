package org.zemosolabs.controllers;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.CoreMatchers.is;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.zemosolabs.dto.CollaboratorDTO;
import org.zemosolabs.services.CollaboratorService;

import java.util.ArrayList;
import java.util.List;

@WebMvcTest(CollaboratorController.class)
class CollaboratorControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    CollaboratorService collaboratorService;
    private List<CollaboratorDTO> collaboratorDTOS;

    @BeforeEach
    void setUp(){
        this.collaboratorDTOS = new ArrayList<>();
        this.collaboratorDTOS.add(new CollaboratorDTO());
    }

    @Test
    void getAllCllaborators() throws Exception{
        when(collaboratorService.getCollaboratos()).thenReturn(collaboratorDTOS);
        this.mockMvc.perform(get("/api/v1/collaborators")).andExpect(status().isOk()).andExpect(jsonPath("$.size()",is(collaboratorDTOS.size())));
    }
}
