package org.zemosolabs.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.zemosolabs.model.AccessPermissionTypes;

import java.util.UUID;

@Repository
public interface AccessPermissionsRepository extends CrudRepository<AccessPermissionTypes, UUID> {
}
