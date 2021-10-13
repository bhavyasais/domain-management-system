package org.zemosolabs.services;

import org.zemosolabs.dto.DepartmentDTO;

import java.util.List;

public interface DepartmentService {
    List<DepartmentDTO> getDepartments();
    DepartmentDTO addDepartment(DepartmentDTO departmentDTO);
}
