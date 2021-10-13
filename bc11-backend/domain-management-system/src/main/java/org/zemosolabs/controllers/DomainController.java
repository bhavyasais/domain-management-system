package org.zemosolabs.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.zemosolabs.dto.DomainDTO;
import org.zemosolabs.dto.DomainTrustGroupDTO;
import org.zemosolabs.exception.ResourceNotFoundException;
import org.zemosolabs.model.Domain;
import org.zemosolabs.services.DomainService;
import org.zemosolabs.services.DomainTrustService;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Slf4j
public class DomainController {

    @Autowired
    DomainService domainService;

    @Autowired
    DomainTrustService domainTrustService;


    @GetMapping("/alldomains")
    public ResponseEntity<List<DomainDTO>> getDomains() throws ResourceNotFoundException {
        log.info("Enter into get all domains API");
        List<DomainDTO> domains = domainService.getDomains();
        if (domains == null) {
            throw new ResourceNotFoundException("Domains are Empty");
        }
        log.info("Exit from get all domains API");
        return ResponseEntity.ok(domains);
    }

    @GetMapping("/domains")
    public ResponseEntity<List<DomainDTO>> getDomains(@RequestParam(value = "collaborators_id") UUID collaboratorsId, @RequestParam(value = "departments_id") UUID departmentId) throws ResourceNotFoundException {
        log.info("Enter into get domains API");
        List<DomainDTO> domains = domainService.getDomains(collaboratorsId, departmentId);
        if (domains == null) {
            throw new ResourceNotFoundException("Domains are Empty");
        }
        log.info("Exit from get domains API");
        return ResponseEntity.ok(domains);
    }

    @PostMapping("/domains")
    public ResponseEntity<DomainDTO> addDomain(@Validated @RequestBody DomainDTO domainDTO) throws ResourceNotFoundException {
        log.info("Enter into add domain API");
        DomainDTO dto = domainService.addDomain(domainDTO);
        if (dto == null) {
            log.error("Something went wrong in adding a domain");
            throw new ResourceNotFoundException("Something went wrong in adding a Domain");
        } else {
            CompletableFuture.runAsync(() -> {
                try {
                    domainService.callCollaborator(Collections.singletonList(domainDTO.getDomainName()), domainDTO.getDepartmentsId(), domainDTO.getTrustGroupsId());
                } catch (JSONException | JsonProcessingException e) {
                    e.printStackTrace();
                }
            });

        }
        log.info("Exit from add domain API");
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/domains")
    public ResponseEntity<Domain> updateDomain(@RequestBody DomainDTO domainDTO) throws ResourceNotFoundException {
        log.info("Enter into update domain API");
        Domain domain = domainService.updateDomain(domainDTO);
        if (domain == null) {
            throw new ResourceNotFoundException("Something went wrong in adding a Domain");
        } else {
            CompletableFuture.runAsync(() -> domainService.updateDomainInCollaborator(domainDTO.getId(), domainDTO.getDomainName()));
        }
        log.info("Exit from update domain API");
        return ResponseEntity.ok(domain);
    }

    @PutMapping(value = "/domainTrustGroup", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DomainTrustGroupDTO> updateTrustGroup(@RequestBody DomainTrustGroupDTO domainTrustGroupDTO) throws ResourceNotFoundException {
        DomainTrustGroupDTO domainTrustGroup = domainTrustService.updateTrustGroup(domainTrustGroupDTO);
        if (domainTrustGroup == null) {
            throw new ResourceNotFoundException("Something went wrong in updating a Domain");
        } else {
            CompletableFuture.runAsync(() -> {
                try {
                    domainService.updateDomainTrustGroup(domainTrustGroupDTO.getDepartmentsId(), domainTrustGroupDTO.getTrustGroupsId());
                } catch (JSONException e) {
                    log.error(e.getLocalizedMessage());
                }
            }) ;
        }
        return ResponseEntity.ok(domainTrustGroup);
    }
}
