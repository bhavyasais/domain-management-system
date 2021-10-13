import { withStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import AccessGrid from '../../components/organisms/AccessGrid/AccessGrid';
import DomainGrid from '../../components/organisms/DomainGrid/DomainGrid';
import RelationshipGrid from '../../components/organisms/RelationshipGrid/RelationshipGrid';
import AccessPanel from '../../components/templates/AccessPanel/AccessPanel';
import Tabs from '../../components/templates/Tabs/Tabs';
import DepartmentService from '../../services/DepartmentService';
import DomainService from '../../services/DomainService';
import TrustGroupService from '../../services/TrustGroupService';
import { trustGrouprowData } from '../../utils/commandCentermockData';
import { UpdateDomainsValue } from '../../utils/helper';
import { RELATIONS } from '../../utils/Strings';

const styles = () => ({});

const CommandCenter = () => {
  const [dept, setDept] = useState([]);
  const [currentDept, setCurrentDept] = useState(null);
  const [trustGroups, setTrustGroups] = useState([]);
  const [tabLabels, setTabLabels] = useState(['Box communication base', 'External partners']);
  const [list, setList] = useState([]);

  const onDataChange = (updatedAarray) => {
  };

  const setCurrentDepartment = (department) => {
    setCurrentDept(department);
    localStorage.setItem('dept', JSON.stringify(department));
  };

  const addDepartment = async (newDept) => {
    try {
      const result = await DepartmentService.addDepartment(newDept);
      setDept((prevDept) => [...prevDept, result]);
    } catch (err) {
      console.warn('error in adding department');
    }
  };

  const addNewTrustGroup = async (trustGroup) => {
    console.log('trsutGroup', trustGroup);
    const alreadyExist = trustGroups.find((item) => item.groupName === trustGroup);
    if (!alreadyExist) {
      try {
        const result = await TrustGroupService.addNewTrustGroup({
          groupName: trustGroup,
          description: `${trustGroup} Group`,
          username: 'test user',
        });
        setTrustGroups((prevTrustGroups) => [...prevTrustGroups, result]);
        setTabLabels((prevtabLabels) => [...prevtabLabels, trustGroup]);
      } catch (error) {
        console.warn('Error in adding new trust group : ', error);
      }
    } else {
      alert('Trustgroup already exists!');
    }
  };

  const fetchDepartments = useCallback(async () => {
    try {
      const result = await DepartmentService.getAllDepartments();
      setDept(result);
      setCurrentDept(result?.[0]);
      localStorage.setItem('dept', JSON.stringify(result[0]));
    } catch (error) {
      console.warn('error in fetching departments : ', error);
    }
  }, []);

  const fetchTrustGroups = useCallback(async () => {
    try {
      const result = await TrustGroupService.getAllTrustGroups();
      setTrustGroups(result);
      setTabLabels((prevLabels) => [...prevLabels, ...result.map((item) => item.groupName)]);
    } catch (error) {
      console.warn('error in fetching departments : ', error);
    }
  }, []);

  const fetchDomains = useCallback(async () => {
    try {
      const result = await DomainService.getAllDomainsForDepartment({
        collaborators_id: localStorage.getItem('Collaboration'),
        departments_id: currentDept?.id,
      });
      setList(result);
    } catch (error) {
      console.warn('error in fetching domains : ', error);
    }
  }, [currentDept]);

  const updateTrustGroup = async (data) => {
    const param = {
      id: data.trust_groups_id,
      description: 'trust group updated',
      groupName: data.trustGroupName,
      username: 'test user',
    };
    try {
      await TrustGroupService.updateTrustGroup(param);
    } catch (err) {
      console.warn('Error in updating trust group name : ', err);
    }
  };

  useEffect(() => {
    fetchTrustGroups();
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const updateDomain = async (data) => {
    const params = {
      id: data.id,
      trust_score: data.trust_score,
      relationship: data.relationship,
      domain_name: data.domain_name,
      username: data.created_by,
    };
    try {
      await DomainService.updateDomain(params);

      const updateData = UpdateDomainsValue([...list], data);
      setList(updateData);
    } catch (error) {
      console.warn('Error in updating domain : ', error);
    }
  };

  return (
    <div>
      <AccessPanel headerVariant="h3">
        <Tabs
          tabLabels={tabLabels}
          dept={dept}
          addDepartment={addDepartment}
          currentDept={currentDept}
          setCurrentDepartment={setCurrentDepartment}
          addTrustGroup={addNewTrustGroup}
        >
          {tabLabels.map((label, idx) => {
            if (label === 'Box communication base') {
              return (
                <AccessGrid
                  rowData={trustGrouprowData}
                  trustGroups={trustGroups}
                  deptId={currentDept?.id}
                  index={idx}
                  addTrustGroup={addNewTrustGroup}
                  updateTrustGroup={updateTrustGroup}
                  key
                />
              );
            }
            if (label === 'External partners') {
              return (
                <DomainGrid
                  trustGroups={trustGroups}
                  onDataChange={onDataChange}
                  index={idx}
                  deptId={currentDept?.id}
                  deptName={currentDept?.name}
                  key
                  list={list}
                  setList={setList}
                  updateDomain={updateDomain}
                />
              );
            }
            return (
              <RelationshipGrid
                index={idx}
                relationships={RELATIONS}
                deptId={currentDept?.id}
                trustGroup={trustGroups.find((item) => item.groupName === label)}
                key
                list={list}
                setList={setList}
                updateDomain={updateDomain}
              />
            );
          })}
        </Tabs>
      </AccessPanel>
    </div>
  );
};

CommandCenter.propTypes = {};
CommandCenter.defaultProps = {};

export default withStyles(styles)(CommandCenter);
