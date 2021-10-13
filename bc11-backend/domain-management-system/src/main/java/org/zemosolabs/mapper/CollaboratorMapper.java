package org.zemosolabs.mapper;

import org.springframework.stereotype.Service;
import org.zemosolabs.dto.CollaboratorDTO;
import org.zemosolabs.model.Collaborator;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollaboratorMapper {

    public List<CollaboratorDTO> entityToDto(List<Collaborator> collaboratorList){
        return collaboratorList.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public CollaboratorDTO entityToDto(Collaborator collaborator){
        CollaboratorDTO collaboratorDTO = new CollaboratorDTO();
        collaboratorDTO.setId(collaborator.getCollaboratorId());
        collaboratorDTO.setName(collaborator.getName());
        collaboratorDTO.setImageURL(collaborator.getImageURL());
        return collaboratorDTO;
    }
}
