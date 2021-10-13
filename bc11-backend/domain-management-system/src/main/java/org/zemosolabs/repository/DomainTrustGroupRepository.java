package org.zemosolabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zemosolabs.model.DomainTrustGroup;

import java.util.List;
import java.util.UUID;

@Repository
public interface DomainTrustGroupRepository extends JpaRepository<DomainTrustGroup, UUID> {
    List<DomainTrustGroup> findByDomainId(UUID domainId);
    List<DomainTrustGroup> findByCollaboratorsIdAndDepartmentsId(UUID collaboratorsId, UUID departmentId);
    List<DomainTrustGroup> findByDepartmentsId(UUID departmentId);
    List<DomainTrustGroup> findByCollaboratorsIdAndDepartmentsIdAndTrustGroupId(UUID collaboratorsId, UUID departmentId, UUID trustGroupId);
}
