package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.DomainTrustGroupDTO;
import org.zemosolabs.mapper.DomainTrustGroupMapper;
import org.zemosolabs.model.Domain;
import org.zemosolabs.model.DomainTrustGroup;
import org.zemosolabs.model.TrustGroup;
import org.zemosolabs.repository.DomainTrustGroupRepository;
import org.zemosolabs.repository.TrustGroupRepository;
import org.zemosolabs.services.impl.DomainTrustServiceImpl;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class DomainTrustServiceTest {
    DomainTrustGroupRepository domainTrustGroupRepository = mock(DomainTrustGroupRepository.class);
    TrustGroupRepository trustGroupRepository = mock(TrustGroupRepository.class);
    DomainTrustGroupMapper domainTrustGroupMapper = mock(DomainTrustGroupMapper.class);

    DomainTrustService domainTrustService = new DomainTrustServiceImpl(domainTrustGroupRepository,trustGroupRepository,domainTrustGroupMapper);

    @Test
     void updateTrustGroup() throws  Exception{
        DomainTrustGroup domainTrustGroup = new DomainTrustGroup();
        DomainTrustGroupDTO domainTrustGroupDTO = new DomainTrustGroupDTO();
        Domain domain = new Domain();
        TrustGroup trustGroup = new TrustGroup();

        trustGroup.setId(UUID.randomUUID());
        trustGroup.setGroupName("groupName");

        domain.setId(UUID.randomUUID());
        domain.setName("name");

        domainTrustGroupDTO.setId(UUID.randomUUID());
        domainTrustGroupDTO.setDomain(domain);

        when(domainTrustGroupRepository.findById(any())).thenReturn(Optional.of(domainTrustGroup));
        when(trustGroupRepository.findById(any())).thenReturn(Optional.of(trustGroup));
        when(domainTrustGroupMapper.entityToDto(domainTrustGroup)).thenReturn(domainTrustGroupDTO);

        DomainTrustGroupDTO domainTrustGroupDTO1 = domainTrustService.updateTrustGroup(domainTrustGroupDTO);

        Assert.assertNotNull(domainTrustGroupDTO1);
        Assert.assertEquals(domainTrustGroupDTO1.getId(),domainTrustGroupDTO.getId());



    }
}
