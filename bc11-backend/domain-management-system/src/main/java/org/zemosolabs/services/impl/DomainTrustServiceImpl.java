package org.zemosolabs.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.zemosolabs.dto.DomainTrustGroupDTO;
import org.zemosolabs.mapper.DomainTrustGroupMapper;
import org.zemosolabs.model.DomainTrustGroup;
import org.zemosolabs.model.TrustGroup;
import org.zemosolabs.repository.DomainTrustGroupRepository;
import org.zemosolabs.repository.TrustGroupRepository;
import org.zemosolabs.services.DomainTrustService;

import javax.persistence.EntityNotFoundException;

@Slf4j
@Service
public class DomainTrustServiceImpl implements DomainTrustService {

    private final DomainTrustGroupRepository domainTrustGroupRepository;

    private final TrustGroupRepository trustGroupRepository;

    private final DomainTrustGroupMapper domainTrustGroupMapper;

    public DomainTrustServiceImpl(DomainTrustGroupRepository domainTrustGroupRepository, TrustGroupRepository trustGroupRepository, DomainTrustGroupMapper domainTrustGroupMapper) {
        this.domainTrustGroupRepository = domainTrustGroupRepository;
        this.trustGroupRepository = trustGroupRepository;
        this.domainTrustGroupMapper = domainTrustGroupMapper;
    }

    @Override
    public DomainTrustGroupDTO updateTrustGroup(DomainTrustGroupDTO domainTrustGroupDTO) {
        DomainTrustGroup domainTrustGroup = domainTrustGroupRepository.findById(domainTrustGroupDTO.getId()).orElseThrow(() -> new EntityNotFoundException("Not found " + domainTrustGroupDTO.getId()));
        TrustGroup trustGroup = trustGroupRepository.findById(domainTrustGroupDTO.getTrustGroupsId()).orElseThrow(() -> new EntityNotFoundException("Not found " + domainTrustGroupDTO.getTrustGroupsId()));
        domainTrustGroup.setTrustGroup(trustGroup);
        domainTrustGroupRepository.save(domainTrustGroup);
        return domainTrustGroupMapper.entityToDto(domainTrustGroup);
    }
}
