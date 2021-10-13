package org.zemosolabs.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zemosolabs.dto.AccessPermissionTypesDTO;
import org.zemosolabs.dto.PermissionGrantDTO;
import org.zemosolabs.services.PermissionGrantService;
import org.zemosolabs.services.PermissionService;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Slf4j
public class PermissionGrantController {

    @Autowired
    PermissionService permissionService;

    @Autowired
    PermissionGrantService permissionGrantService;

    @GetMapping("/permissions")
    public ResponseEntity<List<AccessPermissionTypesDTO>> getPermissionTypes(){
        return ResponseEntity.ok(permissionService.getAllPermissionTypes());
    }

    @GetMapping(value = "/permission-grant")
    public ResponseEntity<List<PermissionGrantDTO>> getPermissionGrants(@RequestParam(value = "collaborators_id") UUID collaboratorsId, @RequestParam(value = "departments_id") UUID departmentId){
        return ResponseEntity.ok(permissionGrantService.getAllPermissions(collaboratorsId,departmentId));
    }

    @PutMapping(value = "/permission-grant")
    public ResponseEntity<PermissionGrantDTO> updatePermissions(@RequestBody PermissionGrantDTO permissionGrantDTO) {
        log.info("Entered into updatePermissions {}" ,new Date());
        PermissionGrantDTO result = permissionGrantService.updatePermissions(permissionGrantDTO);
        if(result != null) {
            CompletableFuture.runAsync(() -> permissionGrantService.callCollaboratorServiceToUpdatePermissions(permissionGrantDTO));
        }
        log.info("Exit from updatePermissions {}" ,new Date());
        assert result != null;
        return ResponseEntity.ok(result);
    }

}
