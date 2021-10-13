package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.DepartmentDTO;
import org.zemosolabs.model.Department;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentMapper {

    public List<DepartmentDTO> entityToDto(List<Department> departments){
        return departments.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public DepartmentDTO entityToDto(Department department){
        DepartmentDTO departmentDTO = new DepartmentDTO();
        departmentDTO.setDepartmentName(department.getDepartmentName());
        departmentDTO.setDescription(department.getDescription());
        departmentDTO.setId(department.getId());
        departmentDTO.setUsername(department.getCreatedBy());
        return departmentDTO;
    }
}
