package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.DomainDTO;
import org.zemosolabs.mapper.DomainMapper;
import org.zemosolabs.model.Domain;
import org.zemosolabs.model.DomainTrustGroup;
import org.zemosolabs.model.TrustGroup;
import org.zemosolabs.repository.DepartmentRepository;
import org.zemosolabs.repository.DomainRepository;
import org.zemosolabs.repository.DomainTrustGroupRepository;
import org.zemosolabs.repository.TrustGroupRepository;
import org.zemosolabs.services.impl.DomainServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class DomainServiceTest {
    DomainRepository domainRepository = mock(DomainRepository.class);
    DomainTrustGroupRepository domainTrustGroupRepository = mock(DomainTrustGroupRepository.class);
    TrustGroupRepository trustGroupRepository = mock(TrustGroupRepository.class);
    DomainMapper domainMapper = mock(DomainMapper.class);
    DepartmentRepository departmentRepository = mock(DepartmentRepository.class);
    DomainService domainService = new DomainServiceImpl(domainRepository, domainTrustGroupRepository, trustGroupRepository, domainMapper, departmentRepository);

    @Test
     void getDomains() {
        Domain domain = new Domain();
        domain.setName("testDomain");
        List<Domain> domainList = new ArrayList<Domain>();
        domainList.add(domain);
        DomainTrustGroup domainTrustGroup = new DomainTrustGroup();
        domainTrustGroup.setId(domain.getId());
        domainTrustGroup.setDomain(domain);
        domainTrustGroup.setTrustGroup(new TrustGroup());
        List<DomainTrustGroup> domainTrustGroupList = new ArrayList<>();
        domainTrustGroupList.add(domainTrustGroup);
        DomainDTO domainDTO = new DomainDTO();
        domainDTO.setId(domain.getId());
        domainDTO.setDomainName(domain.getName());

        when(domainRepository.findAll()).thenReturn(domainList);
        when(domainMapper.entityToDto(domain)).thenReturn(domainDTO);
        when(domainTrustGroupRepository.findByDomainId(any())).thenReturn(domainTrustGroupList);

        List<DomainDTO> domainDTOList = domainService.getDomains();

        Assert.assertNotNull(domainDTOList);
        Assert.assertEquals(domainDTOList.get(0).getDomainTrustGroupId(), domain.getId());

    }

    @Test
     void getDomainsForCollaborator() {
        Domain domain = new Domain();
        domain.setName("testDomain");
        List<Domain> domainList = new ArrayList<Domain>();
        domainList.add(domain);
        DomainTrustGroup domainTrustGroup = new DomainTrustGroup();
        domainTrustGroup.setId(domain.getId());
        domainTrustGroup.setDomain(domain);
        domainTrustGroup.setTrustGroup(new TrustGroup());
        List<DomainTrustGroup> domainTrustGroupList = new ArrayList<>();
        domainTrustGroupList.add(domainTrustGroup);
        DomainDTO domainDTO = new DomainDTO();
        domainDTO.setId(domain.getId());
        domainDTO.setDomainName(domain.getName());
        Optional<Domain> optionalDomain = Optional.of(domain);
        when(domainTrustGroupRepository.findByCollaboratorsIdAndDepartmentsId(any(), any())).thenReturn(domainTrustGroupList);
        when(domainRepository.findById(any())).thenReturn(optionalDomain);
        when(domainMapper.entityToDto(domain)).thenReturn(domainDTO);

        List<DomainDTO> domainDTOList = domainService.getDomains(UUID.randomUUID(), UUID.randomUUID());

        Assert.assertNotNull(domainDTOList);
        Assert.assertEquals(domainDTOList.get(0).getDomainTrustGroupId(), domain.getId());

    }

    @Test
     void addDomain() {
        Domain domain = new Domain();
        domain.setName("testDomain");

        DomainDTO domainDTO = new DomainDTO();
        domainDTO.setId(domain.getId());
        domainDTO.setDomainName(domain.getName());
        domainDTO.setRelationship("relation");

        DomainTrustGroup domainTrustGroup = new DomainTrustGroup();
        domainTrustGroup.setId(UUID.randomUUID());
        domainTrustGroup.setDomain(domain);
        domainTrustGroup.setTrustGroup(new TrustGroup());

        List<Domain> domainList = new ArrayList<Domain>();
        domainList.add(domain);

        List<DomainTrustGroup> domainTrustGroupList = new ArrayList<>();
        domainTrustGroupList.add(domainTrustGroup);

        Optional<Domain> optionalDomain = Optional.of(domain);

        TrustGroup trustGroup = new TrustGroup();
        trustGroup.setId(UUID.randomUUID());
        Optional<TrustGroup> trustGroupOptional = Optional.of(trustGroup);

        when(trustGroupRepository.findById(any())).thenReturn(trustGroupOptional);
        when(domainTrustGroupRepository.save(domainTrustGroup)).thenReturn(domainTrustGroup);
        when(domainTrustGroupRepository.save(any())).thenReturn(domainTrustGroup);
        when(domainRepository.save(any(Domain.class))).thenReturn(domain);
        when(domainMapper.entityToDto(domain)).thenReturn(domainDTO);

        DomainDTO domainDTO1 = domainService.addDomain(domainDTO);

        Assert.assertNotNull(domainDTO1);
        Assert.assertEquals(domainDTO1.getDomainName(), domain.getName());

    }

    @Test
     void updateDomains() {
        Domain domain = new Domain();
        domain.setName("testDomain");

        DomainDTO domainDTO = new DomainDTO();
        domainDTO.setId(domain.getId());
        domainDTO.setDomainName(domain.getName());
        domainDTO.setTrustScore(123);
        domainDTO.setRelationship("rel");

        when(domainRepository.save(domain)).thenReturn(domain);
        when(domainRepository.findById(any())).thenReturn(Optional.of(domain));

        Domain domain1 = domainService.updateDomain(domainDTO);

        Assert.assertNotNull(domain1);
        Assert.assertEquals(domain1.getId(), domain.getId());

    }
}
