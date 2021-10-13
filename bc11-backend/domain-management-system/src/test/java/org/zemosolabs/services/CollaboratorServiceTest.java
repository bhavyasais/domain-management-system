package org.zemosolabs.services;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.zemosolabs.dto.CollaboratorDTO;
import org.zemosolabs.mapper.CollaboratorMapper;
import org.zemosolabs.model.Collaborator;
import org.zemosolabs.repository.CollaboratorRepository;
import org.zemosolabs.services.impl.CollaboratorServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(JUnit4.class)
 class CollaboratorServiceTest {

    CollaboratorRepository collaboratorRepository = mock(CollaboratorRepository.class);
    CollaboratorMapper collaboratorMapper = mock(CollaboratorMapper.class);

    CollaboratorService collaboratorService = new CollaboratorServiceImpl(collaboratorRepository, collaboratorMapper);

    @Test
     void getCollaborators() throws Exception{
        Collaborator collaborator = new Collaborator();
        collaborator.setCollaboratorId(UUID.randomUUID());
        List<Collaborator> collaboratorList = new ArrayList<>();
        collaboratorList.add(collaborator);
        when(collaboratorRepository.findAll()).thenReturn(collaboratorList);
        when(collaboratorMapper.entityToDto(collaboratorList)).thenReturn(new ArrayList<CollaboratorDTO>());
        List<CollaboratorDTO> collaboratorDTOS = collaboratorService.getCollaboratos();
        Assert.assertNotNull(collaboratorDTOS);
    }

}
