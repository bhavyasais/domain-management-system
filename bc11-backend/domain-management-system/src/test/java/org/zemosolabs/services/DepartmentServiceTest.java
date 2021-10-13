package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.DepartmentDTO;
import org.zemosolabs.mapper.DepartmentMapper;
import org.zemosolabs.model.Department;
import org.zemosolabs.repository.DepartmentRepository;
import org.zemosolabs.services.impl.DepartmentServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class DepartmentServiceTest {

    DepartmentRepository departmentRepository = mock(DepartmentRepository.class);
    DepartmentMapper departmentMapper =mock(DepartmentMapper.class) ;

    DepartmentService departmentService = new DepartmentServiceImpl(departmentRepository,departmentMapper);

    @Test
     void getDepartments() throws Exception{
        Department department = new Department();
        department.setId(UUID.randomUUID());
        List<Department> departmentList =  new ArrayList<>();
        departmentList.add(department);
        DepartmentDTO departmentDTO = new DepartmentDTO();
        departmentDTO.setId(department.getId());
        List<DepartmentDTO> departmentDTOList = new ArrayList<>();
        departmentDTOList.add(departmentDTO);
        when(departmentRepository.findAll()).thenReturn(departmentList);
        when(departmentMapper.entityToDto(departmentList)).thenReturn(departmentDTOList);
        List<DepartmentDTO> departmentDTOList1 = departmentService.getDepartments();
        Assert.assertNotNull(departmentDTOList1);
        Assert.assertEquals(departmentDTOList1.get(0).getId(),department.getId());
    }

    @Test
     void addDepartments() throws Exception{
        DepartmentDTO departmentDTO = new DepartmentDTO();
        departmentDTO.setId(UUID.randomUUID());
        departmentDTO.setDepartmentName("test");
        departmentDTO.setDescription("test");
        departmentDTO.setUsername("user");
        Department department = new Department();
        department.setId(UUID.randomUUID());
        department.setDepartmentName("test");
        department.setDescription("test");
        department.setCreatedBy("user");
        when(departmentRepository.save(any(Department.class))).thenReturn(department);
        when(departmentMapper.entityToDto(department)).thenReturn(departmentDTO);
        DepartmentDTO departmentDTO1 = departmentService.addDepartment(departmentDTO);
        Assert.assertNotNull(departmentDTO1);
        Assert.assertEquals(departmentDTO1.getDepartmentName(),department.getDepartmentName());
    }
}
