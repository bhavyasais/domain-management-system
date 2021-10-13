package org.zemosolabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zemosolabs.model.AccessPermissionTypes;

import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<AccessPermissionTypes, UUID> {

}
