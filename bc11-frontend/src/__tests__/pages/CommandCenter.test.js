import React from 'react';
import renderer from 'react-test-renderer';
import CommandCenter from '../../pages/CommandCenter/CommandCenter';
import DepartmentService from '../../services/DepartmentService';
import TrustGroupService from '../../services/TrustGroupService';
import RelationshipService from '../../services/RelationshipService';
import DomainService from '../../services/DomainService';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import AccessGrid from '../../components/organisms/AccessGrid/AccessGrid';
import DomainGrid from '../../components/organisms/DomainGrid/DomainGrid';

jest.mock('../../services/DepartmentService');
jest.mock('../../services/TrustGroupService');
jest.mock('../../services/RelationshipService');
jest.mock('../../services/DomainService');
const DEPARTMENTS_RESPONSE = [
  {
    id: '51ce0b20-fd9c-41af-85a6-1e063aecbeb0',
    name: 'Sales',
  },
  {
    id: 'c1faba5e-9d82-45a3-89a0-faa21f207a6a',
    name: 'Legal',
  },
  {
    id: 'fb89416f-1f05-41d1-87f7-d908e0a3199c',
    name: 'Finance',
  },
  {
    id: 'dc7cd529-bc0f-4c1c-8b1d-7d27e75d1a35',
    name: 'Investor Relations',
  },
];

const TRUSTGROUP_RESPONSE = [
  {
    id: '228afde7-a65b-407d-b11e-e2c290559edd',
    name: 'Do not trust',
  },
  {
    id: 'd78007b4-70be-4ef3-be62-e5505e9ba3be',
    name: 'Top 100',
  },
  {
    id: 'ed7f065e-911d-4bd8-84df-cd85427b1b60',
    name: 'Top 10000',
  },
  {
    id: 'be4efe99-33a0-4de2-af43-b16db6af9782',
    name: 'Top 30000',
  },
];

const RELATIONSHIP_RESPONSE = [
  {
    id: 'c4916255-fe5c-40de-93dc-5e6b57fa1dc4',
    name: 'Zemosolabs',
    address: 'zemosolabs.com',
    trust_score: '222',
    relationship: 'Partner',
  },
  {
    id: 'd1eae897-4fa3-49f7-9071-27136b670f40',
    name: 'Ycombinator',
    address: 'ycombinator.com',
    trust_score: '222',
    relationship: 'Customer',
  },
  {
    id: '0aad7176-59be-496a-8b57-71915a9cd010',
    name: 'Clearedin',
    address: 'clearedin.com',
    trust_score: '222',
    relationship: 'Vendor',
  },
];

describe('CommandCenter', () => {
  const handleClick = jest.fn();
  it('should render correctly', () => {
    let wrapper;
    wrapper = shallow(<CommandCenter />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Service calls works', async () => {
    DepartmentService.getAllDepartments.mockReturnValue(DEPARTMENTS_RESPONSE);
    TrustGroupService.getAllTrustGroups.mockReturnValue(TRUSTGROUP_RESPONSE);
    RelationshipService.getAllRelations.mockReturnValue(RELATIONSHIP_RESPONSE);
    DomainService.getAllDomainsForDepartment.mockReturnValue(RELATIONSHIP_RESPONSE);
    let mounted;
    act(() => {
      mounted = mount(<CommandCenter />);
    });
    await act(async () => {
      await Promise.resolve(mounted);
      await Promise.resolve(mounted);
      await Promise.resolve(mounted);
      await Promise.resolve(mounted);
      mounted.update();
    });
    expect(mounted).toBeDefined();
  });
  it('testing tabs', () => {
    const wrapper = mount(<CommandCenter setCurrentDepartment={handleClick} addDepartment={handleClick}/>);
    wrapper.find('Tabs').at(0).props().setCurrentDepartment();
    wrapper.find('Tabs').at(0).props().addDepartment();
    wrapper.find('Tabs').at(0).props().addTrustGroup();
    expect(wrapper).toMatchSnapshot();
  });

  it('testing update domain', () => {
    const wrapper = mount(<CommandCenter updateDomain={handleClick}/>);
    DomainService.updateDomain({})
    wrapper.find(DomainGrid).props().updateDomain({data:{domain_name:"Top 100",trust_score:222,relationship:"Customer",username:"Bhavya"}});
    wrapper.find('DomainGrid').at(0).props().updateDomain();
    expect(wrapper).toMatchSnapshot();
  });
  
  it('testing update tg', () => {
    const wrapper = mount(<CommandCenter updateDomain={handleClick}/>);
    TrustGroupService.updateTrustGroup({})
    wrapper.find(AccessGrid).props().updateTrustGroup({data:{trustGroupName:"Top 100"}});
  });
});
