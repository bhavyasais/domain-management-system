package org.zemosolabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zemosolabs.model.PermissionGrant;

import java.util.List;
import java.util.UUID;

@Repository
public interface PermissionGrantRepository extends JpaRepository<PermissionGrant, UUID> {
    List<PermissionGrant> findAllByCollaboratorsIdAndDepartmentsId(UUID collaboratorId, UUID departmentId);
    List<PermissionGrant> findByTrustGroupId(UUID trustGroupsId);
    List<PermissionGrant> findByTrustGroupIdAndDepartmentsId(UUID trustGroupsId, UUID departmenstId);
    List<PermissionGrant> findAllByCollaboratorsIdAndDepartmentsIdAndIsActive(UUID trustGroupsId, UUID departmenstId, boolean isActive);
}
