package org.zemosolabs.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zemosolabs.dto.CollaboratorDTO;
import org.zemosolabs.exception.ResourceNotFoundException;
import org.zemosolabs.services.CollaboratorService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collaborators")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Slf4j
public class CollaboratorController {

    @Autowired
    CollaboratorService collaboratorService;

    @GetMapping("")
    public ResponseEntity<List<CollaboratorDTO>> getCollaboratos() throws ResourceNotFoundException {
        log.info("Entered into getCollaboratos API");
        List<CollaboratorDTO> collaboratos = collaboratorService.getCollaboratos();
        if(collaboratos == null) {
            throw new ResourceNotFoundException("Collaborators are Empty");
        }
        log.info("Exit from getCollaboratos API");
        return ResponseEntity.ok(collaboratos);
    }

}
