package org.zemosolabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.zemosolabs.model.Domain;

import java.util.UUID;

@Repository
public interface DomainRepository extends JpaRepository<Domain, UUID> {
}
