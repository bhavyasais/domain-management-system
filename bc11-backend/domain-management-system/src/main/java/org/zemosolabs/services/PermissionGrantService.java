package org.zemosolabs.services;


import org.zemosolabs.dto.PermissionGrantDTO;

import java.util.List;
import java.util.UUID;

public interface PermissionGrantService {

    List<PermissionGrantDTO> getAllPermissions(UUID departmentId, UUID collaboratorId);
    PermissionGrantDTO updatePermissions(PermissionGrantDTO permissionGrantDTO);
    void callCollaboratorServiceToUpdatePermissions(PermissionGrantDTO permissionGrantDTO);
}
