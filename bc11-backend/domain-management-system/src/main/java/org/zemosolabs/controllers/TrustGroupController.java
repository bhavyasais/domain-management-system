package org.zemosolabs.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.zemosolabs.dto.TrustGroupDTO;
import org.zemosolabs.exception.ResourceNotFoundException;
import org.zemosolabs.services.TrustGroupService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trust-groups")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Slf4j
public class TrustGroupController {

    @Autowired
    TrustGroupService trustGroupService;

    @GetMapping("")
    public ResponseEntity<List<TrustGroupDTO>> getTrustGroups() throws ResourceNotFoundException {
        log.info("Entered into getTrustGroups API");
        List<TrustGroupDTO> trustGroups = trustGroupService.getTrustGroups();
        if(trustGroups == null) {
            throw new ResourceNotFoundException("TrustGroups are Empty");
        }
        log.info("Exit from getTrustGroups API");
        return ResponseEntity.ok(trustGroups);
    }

    @PostMapping("")
    public ResponseEntity<TrustGroupDTO> addTrustGroup(@Validated @RequestBody TrustGroupDTO trustGroupDTO) throws ResourceNotFoundException {
        log.info("Entered into addTrustGroup API");
        TrustGroupDTO trustGroup = trustGroupService.addTrustGroup(trustGroupDTO);
        if(trustGroup == null) {
            throw new ResourceNotFoundException("Something went wrong in adding a TrustGroup");
        }
        log.info("Exit from addTrustGroup API");
        return ResponseEntity.ok(trustGroup);
    }

    @PutMapping("")
    public ResponseEntity<TrustGroupDTO> editTrustGroup(@Validated @RequestBody TrustGroupDTO trustGroupDTO) throws ResourceNotFoundException {
        log.info("Entered into addTrustGroup API");
        TrustGroupDTO trustGroup = trustGroupService.editTrustGroup(trustGroupDTO);
        if(trustGroup == null) {
            throw new ResourceNotFoundException("Something went wrong in adding a TrustGroup");
        }
        log.info("Exit from addTrustGroup API");
        return ResponseEntity.ok(trustGroup);
    }
}
