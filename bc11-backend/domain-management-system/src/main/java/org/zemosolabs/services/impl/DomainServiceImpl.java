package org.zemosolabs.services.impl;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.zemosolabs.dto.DomainDTO;
import org.zemosolabs.mapper.DomainMapper;
import org.zemosolabs.model.*;
import org.zemosolabs.repository.*;
import org.zemosolabs.services.DomainService;
import org.zemosolabs.util.Props;
import org.zemosolabs.util.RestTemplateClient;

import javax.persistence.EntityNotFoundException;
import java.util.*;

import static org.zemosolabs.util.AppConstants.*;

@Slf4j
@Service
public class DomainServiceImpl implements DomainService {

    private final DomainRepository domainRepository;

    private final DomainTrustGroupRepository domainTrustGroupRepository;

    private final TrustGroupRepository trustGroupRepository;

    private final DomainMapper domainMapper;

    private final DepartmentRepository departmentRepository;

    public DomainServiceImpl(DomainRepository domainRepository, DomainTrustGroupRepository domainTrustGroupRepository, TrustGroupRepository trustGroupRepository, DomainMapper domainMapper, DepartmentRepository departmentRepository) {
        this.domainRepository = domainRepository;
        this.domainTrustGroupRepository = domainTrustGroupRepository;
        this.trustGroupRepository = trustGroupRepository;
        this.domainMapper = domainMapper;
        this.departmentRepository = departmentRepository;
    }


    @Autowired
    private RestTemplateClient restTemplateClient;

    @Autowired
    PermissionGrantRepository permissionGrantRepository;

    @Autowired
    AccessPermissionsRepository accessPermissionsRepository;

    @Autowired
    private Props props;

    public List<DomainDTO> getDomains() {
        List<Domain> all = domainRepository.findAll();
        List<DomainDTO> domainDTOList = new ArrayList<>();

        for(Domain domain: all) {
            DomainDTO domainDTO = domainMapper.entityToDto(domain);
            List<DomainTrustGroup> byDomainId = domainTrustGroupRepository.findByDomainId(domain.getId());
            if(!byDomainId.isEmpty()) {
                domainDTO.setCollaboratorsId(byDomainId.get(0).getCollaboratorsId());
                domainDTO.setDepartmentsId(byDomainId.get(0).getDepartmentsId());
                domainDTO.setTrustGroupsId(byDomainId.get(0).getTrustGroup().getId());
                domainDTO.setTrustGroupName(byDomainId.get(0).getTrustGroup().getGroupName());
                domainDTO.setCreatedBy(byDomainId.get(0).getActionBy());
                domainDTO.setId(byDomainId.get(0).getId());
                domainDTO.setDomainTrustGroupId(byDomainId.get(0).getId());
                domainDTOList.add(domainDTO);
            }
        }

        return domainDTOList;
    }

    public List<DomainDTO> getDomains(UUID collaboratorsId, UUID departmentsId) {
        List<DomainTrustGroup> byCollaboratorIdAndDepartmentId = domainTrustGroupRepository.findByCollaboratorsIdAndDepartmentsId(collaboratorsId, departmentsId);
        List<DomainDTO> domainDTOList = new ArrayList<>();

        for(DomainTrustGroup domainTrustGroup : byCollaboratorIdAndDepartmentId) {
            UUID id = domainTrustGroup.getDomain().getId();
            Optional<Domain> byId = domainRepository.findById(id);
            if(byId.isPresent()) {
                Domain domain = byId.get();
                DomainDTO domainDTO = domainMapper.entityToDto(domain);
                domainDTO.setTrustGroupName(domainTrustGroup.getTrustGroup().getGroupName());
                domainDTO.setTrustGroupsId(domainTrustGroup.getTrustGroup().getId());
                domainDTO.setCollaboratorsId(collaboratorsId);
                domainDTO.setDepartmentsId(departmentsId);
                domainDTO.setId(domain.getId());
                domainDTO.setCreatedBy(domainTrustGroup.getActionBy());
                domainDTO.setDomainTrustGroupId(domainTrustGroup.getId());
                domainDTOList.add(domainDTO);
            }
        }
        return domainDTOList;
    }

    public List<String> getDomains(UUID collaboratorsId, UUID departmentId, UUID trustGroupId) {
        List<DomainTrustGroup> byCollaboratorsIdAndDepartmentsIdAndTrustGroupId = domainTrustGroupRepository.findByCollaboratorsIdAndDepartmentsIdAndTrustGroupId(collaboratorsId, departmentId, trustGroupId);
        List<String> domains = new ArrayList<>();
        for (DomainTrustGroup domainTrustGroup : byCollaboratorsIdAndDepartmentsIdAndTrustGroupId) {
            UUID id = domainTrustGroup.getDomain().getId();
            Optional<Domain> byId = domainRepository.findById(id);
            byId.ifPresent(domain -> domains.add(domain.getName()));
        }
        return domains;
    }

    public DomainDTO addDomain(DomainDTO domainDTO) {
        try {
            Domain domain = new Domain();
            domain.setTrustScore(domainDTO.getTrustScore());
            domain.setRelationship(domainDTO.getRelationship());
            domain.setName(domainDTO.getDomainName());
            domain.setCreatedAt(new Date());
            domain.setCreatedBy(domainDTO.getCreatedBy());
            domain.setAddress(domainDTO.getAddress());
            domain.setActive(true);
            domain.setUpdatedAt(new Date());
            domain.setUpdatedBy(domainDTO.getCreatedBy());
            Domain save = domainRepository.save(domain);
            UUID id = save.getId();

            DomainDTO dto = new DomainDTO();
            dto.setId(id);
            dto.setActive(save.isActive());
            dto.setAddress(save.getAddress());
            dto.setDomainName(save.getName());
            dto.setTrustScore(save.getTrustScore());
            dto.setRelationship(save.getRelationship());
            dto.setCreatedBy(save.getCreatedBy());
            dto.setDepartmentsId(domainDTO.getDepartmentsId());
            dto.setCollaboratorsId(domainDTO.getCollaboratorsId());
            dto.setTrustGroupsId(domainDTO.getTrustGroupsId());


            DomainTrustGroup domainTrustGroup = new DomainTrustGroup();
            domainTrustGroup.setCollaboratorsId(domainDTO.getCollaboratorsId());
            domainTrustGroup.setDepartmentsId(domainDTO.getDepartmentsId());
            domainTrustGroup.setDomain(save);
            domainTrustGroup.setActionAt(new Date());
            domainTrustGroup.setActionBy(domainDTO.getCreatedBy());
            domainTrustGroup.setId(id);
            domainTrustGroup.setTrustGroup(trustGroupRepository.findById(domainDTO.getTrustGroupsId()).orElseThrow(() -> new EntityNotFoundException(domainDTO.getTrustGroupsId() + " not found in trust_groups table")));
            DomainTrustGroup savedDomainTrustGroup = domainTrustGroupRepository.save(domainTrustGroup);

            Optional<TrustGroup> byId = trustGroupRepository.findById(domainDTO.getTrustGroupsId());
            if (byId.isPresent()) {
                TrustGroup trustGroup = byId.get();
                dto.setTrustGroupName(trustGroup.getGroupName());
            }
            dto.setDomainTrustGroupId(savedDomainTrustGroup.getId());

            return dto;
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public Domain updateDomain(DomainDTO domainDTO) {
        UUID id = domainDTO.getId();
        Optional<Domain> byId = domainRepository.findById(id);
        if( byId.isPresent() ) {
            Domain domain = byId.get();
            if(domainDTO.getTrustScore()!=0) {
                domain.setTrustScore(domainDTO.getTrustScore());
            }
            if(StringUtils.isNotEmpty(domainDTO.getRelationship())) {
                domain.setRelationship(domainDTO.getRelationship());
            }
            if(StringUtils.isNotEmpty(domainDTO.getDomainName())){
                domain.setName(domainDTO.getDomainName());
            }
            domain.setUpdatedAt(new Date());
            domain.setUpdatedBy(domainDTO.getUpdatedBy());
            return domainRepository.save(domain);

        }
        return new Domain();
    }

    @Override
    public void callCollaborator(List<String> domainNames, UUID departmentId, UUID trustGroupsId) {
        try {
            Optional<Department> byId = departmentRepository.findById(departmentId);
            if (byId.isPresent()) {
                Department department = byId.get();
                List<PermissionGrant> byTrustGroupIdAndDepartsmentsId = permissionGrantRepository.findByTrustGroupIdAndDepartmentsId(trustGroupsId, departmentId);
                for (PermissionGrant permissionGrant : byTrustGroupIdAndDepartsmentsId) {
                    if(permissionGrant.getIsActive().booleanValue()) {
                        UUID id = permissionGrant.getAccessPermissionTypes().getId();
                        Optional<AccessPermissionTypes> byId1 = accessPermissionsRepository.findById(id);
                        if (byId1.isPresent()) {
                            AccessPermissionTypes accessPermissionTypes = byId1.get();
                            HttpHeaders httpHeaders = new HttpHeaders();
                            httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                            JSONArray list = new JSONArray();
                            for (String domainName : domainNames) {
                                list.put(domainName);
                            }
                            JSONObject jsonObject = new JSONObject();
                            jsonObject.put(DEPARTMENT_NAME, department.getDepartmentName());
                            jsonObject.put(CLIENTS, list);
                            jsonObject.put(TYPE, DOMAIN);
                            if (accessPermissionTypes.getName().equalsIgnoreCase(READ)) {
                                jsonObject.put(PERMISSION_TYPE, READER);
                            } else if (accessPermissionTypes.getName().equalsIgnoreCase(EDIT)) {
                                jsonObject.put(PERMISSION_TYPE, WRITER);
                            } else if (accessPermissionTypes.getName().equalsIgnoreCase(COMMENT)) {
                                jsonObject.put(PERMISSION_TYPE, COMMENTER);
                            } else {
                                jsonObject.put(PERMISSION_TYPE, READER);
                            }
                            HttpEntity<String> request = new HttpEntity<>(jsonObject.toString(), httpHeaders);
                            String result = restTemplateClient.restTemplate().postForObject(props.getProperty("change.permission.endpoint"), request, String.class);
                            log.info("result -> {}" ,result);
                            if ( !domainNames.isEmpty() && result != null && result.equals("true") )
                                log.info("The permission has been changed successfully for the domain name {} at {} " , domainNames , new Date());
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public void callCollaboratorService(List<String> domainNames, UUID departmentId, String permission) {
        try {
            Optional<Department> byId = departmentRepository.findById(departmentId);
            if (byId.isPresent()) {
                Department department = byId.get();
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                JSONArray list = new JSONArray();
                for (String domainName : domainNames) {
                    list.put(domainName);
                }
                JSONObject jsonObject = new JSONObject();
                jsonObject.put(DEPARTMENT_NAME, department.getDepartmentName());
                jsonObject.put(CLIENTS, list);
                jsonObject.put(TYPE, DOMAIN);
                switch (permission) {
                    case WRITER:
                        jsonObject.put(PERMISSION_TYPE, WRITER);
                        break;
                    case COMMENTER:
                        jsonObject.put(PERMISSION_TYPE, COMMENTER);
                        break;
                    default:
                        jsonObject.put(PERMISSION_TYPE, READER);
                        break;
                }
                HttpEntity<String> request = new HttpEntity<>(jsonObject.toString(), httpHeaders);
                String result = restTemplateClient.restTemplate().postForObject(props.getProperty("change.permission.endpoint"), request, String.class);
                log.info("result -> {}" , result);
                if (result != null && result.equals("true") && !domainNames.isEmpty()) {
                    log.info("The permission has been changed successfully for the domain name {} at {} " , domainNames , new Date());
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void updateDomainInCollaborator(UUID id, String domainName) {
        Optional<Domain> byId = domainRepository.findById(id);
        if (byId.isPresent()) {
            Domain domain = byId.get();
            List<DomainTrustGroup> byDomainId = domainTrustGroupRepository.findByDomainId(domain.getId());
            for (DomainTrustGroup domainTrustGroup : byDomainId) {
                UUID departmentId = domainTrustGroup.getDepartmentsId();
                UUID domainTrustGroupId = domainTrustGroup.getTrustGroup().getId();
                callCollaborator(Collections.singletonList(domainName), departmentId, domainTrustGroupId);
            }
        }

    }

    @Override
    public void updateDomainTrustGroup(UUID departmentId, UUID domainTrustGroupId) {
        List<String> domains = new ArrayList<>();
        List<DomainTrustGroup> byDepartmentId = domainTrustGroupRepository.findByDepartmentsId(departmentId);
        for (DomainTrustGroup domainTrustGroup : byDepartmentId) {
            if (domainTrustGroup.getTrustGroup().getId() == (domainTrustGroupId)) {
                domains.add(domainTrustGroup.getDomain().getName());
            }
        }
        callCollaborator(domains, departmentId, domainTrustGroupId);
    }
}
