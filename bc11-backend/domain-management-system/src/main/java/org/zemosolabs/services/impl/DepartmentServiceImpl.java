package org.zemosolabs.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.zemosolabs.dto.DepartmentDTO;
import org.zemosolabs.mapper.DepartmentMapper;
import org.zemosolabs.model.Department;
import org.zemosolabs.repository.DepartmentRepository;
import org.zemosolabs.services.DepartmentService;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    private final DepartmentMapper departmentMapper;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, DepartmentMapper departmentMapper) {
        this.departmentRepository = departmentRepository;
        this.departmentMapper = departmentMapper;
    }

    public List<DepartmentDTO> getDepartments() {
        List<Department> all = departmentRepository.findAll();
        return departmentMapper.entityToDto(all);
    }

    public DepartmentDTO addDepartment(DepartmentDTO departmentDTO) {
        Department department = new Department();
        department.setDepartmentName(departmentDTO.getDepartmentName());
        department.setDescription(departmentDTO.getDescription());
        department.setCreatedAt(new Date());
        department.setCreatedBy(departmentDTO.getUsername());
        Department save = departmentRepository.save(department);
        return departmentMapper.entityToDto(save);
    }
}
