package org.zemosolabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zemosolabs.model.TrustGroup;

import java.util.UUID;

@Repository
public interface TrustGroupRepository extends JpaRepository<TrustGroup, UUID> {
}
