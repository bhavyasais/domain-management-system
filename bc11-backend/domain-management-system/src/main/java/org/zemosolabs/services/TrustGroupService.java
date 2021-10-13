package org.zemosolabs.services;

import org.zemosolabs.dto.TrustGroupDTO;

import java.util.List;

public interface TrustGroupService {
    List<TrustGroupDTO> getTrustGroups();
    TrustGroupDTO addTrustGroup(TrustGroupDTO trustGroupDTO);
    TrustGroupDTO editTrustGroup(TrustGroupDTO trustGroupDTO);
}
