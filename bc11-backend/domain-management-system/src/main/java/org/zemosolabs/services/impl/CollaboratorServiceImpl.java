package org.zemosolabs.services.impl;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.CollaboratorDTO;
import org.zemosolabs.mapper.CollaboratorMapper;
import org.zemosolabs.model.Collaborator;
import org.zemosolabs.repository.CollaboratorRepository;
import org.zemosolabs.services.CollaboratorService;

import java.util.List;

@Service
public class CollaboratorServiceImpl implements CollaboratorService {

    private final CollaboratorRepository collaboratorRepository;

    private final  CollaboratorMapper collaboratorMapper;

    public CollaboratorServiceImpl(CollaboratorRepository collaboratorRepository, CollaboratorMapper collaboratorMapper) {
        this.collaboratorRepository = collaboratorRepository;
        this.collaboratorMapper = collaboratorMapper;
    }


    public List<CollaboratorDTO> getCollaboratos() {
        List<Collaborator> all = collaboratorRepository.findAll();
        return collaboratorMapper.entityToDto( all);
    }
}
