package org.zemosolabs.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zemosolabs.dto.DepartmentDTO;
import org.zemosolabs.exception.ResourceNotFoundException;
import org.zemosolabs.services.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@Slf4j
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;


    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentDTO>> getDepartments() throws ResourceNotFoundException {
        log.info("Entered into getDepartments API");
        List<DepartmentDTO> departments = departmentService.getDepartments();
        if(departments == null) {
            throw new ResourceNotFoundException("Departments are Empty");
        }
        log.info("Exit from getDepartments API");
        return ResponseEntity.ok(departments);
    }

    @PostMapping("/departments")
    public ResponseEntity<DepartmentDTO> addDepartment(@RequestBody DepartmentDTO departmentDTO) throws ResourceNotFoundException {
        log.info("Entered into addDepartment API");
        DepartmentDTO department = departmentService.addDepartment(departmentDTO);
        if(department == null) {
            throw new ResourceNotFoundException("Something went wrong in adding the Department");
        }
        log.info("Exit from addDepartment API");
        return ResponseEntity.ok(department);
    }
}
