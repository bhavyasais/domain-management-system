package org.zemosolabs.services;

import org.zemosolabs.dto.AccessPermissionTypesDTO;

import java.util.List;

public interface PermissionService {

    List<AccessPermissionTypesDTO> getAllPermissionTypes();
}
