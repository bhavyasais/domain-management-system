import React from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import DomainGrid from '../../components/organisms/DomainGrid/DomainGrid';
import { mount } from 'enzyme';
import {
  FixDomainRowTrustGroup,
  UpdateDomainsValue,
  UpdateTrustGroups,
  FixDomainRow,
  CreateTrustGroupPermissionArray,
  createUpdateTrustGroupParam,
  createNewDomainName,
  validateDomainName,
  getDomainCount,
  getPermission,
} from '../../utils/helper';

let agGridReact = null;

const ROW_TRUSTGROUP_DATA = [
  {
    domain: 'zemoso',
    trustGroup: 'Top 100',
    relationship: 'Vendor',
  },
];
const TRUSTGROUP_ARRAY = [
  {
    name: 'Top 100',
  },
];
const data = [
  {
    id: '831dad91-acbc-4d77-b193-8fb7977278d4',
    domain_name: 'New Domain',
    transferFile: true,
  },
  {
    id: 'b72eedfa-1cb1-495f-8ca0-c677aef40d60',
    domain_name: 'New Domain 1',
    editFile: true,
  },
  {
    id: 'b72eedfa-1cb1-495f-8ca0-c677aef40d60',
    domain_name: 'New Domain 2',
    commentFile: true,
  },
  {
    id: 'b72eedfa-1cb1-495f-8ca0-c677aef40d60',
    domain_name: 'New Domain 3',
    viewFile: true,
  },
  {
    id: 'b72eedfa-1cb1-495f-8ca0-c677aef40d60',
    domain_name: 'New Domain 4',
  },
];
const node = { data, rowIndex: 0, column: { colId: 'domain_name' }, oldValue: 'New Domain 1' };
const PERMISSION_ARRAY_DATA = [
  {
    id: 'c3c86f15-5ab6-42ce-9666-ac08e86a4545',
    access_permission_types_id: 'c5ca5ae6-bd2d-4a0d-92df-2337ecae11d8',
    permission_type: 'EDIT',
    trust_groups_id: '1',
    trust_group_name: 'Top 100',
    departments_id: 'c1faba5e-9d82-45a3-89a0-faa21f207a6a',
    department_name: 'Legal',
    collaborators_id: 'c148171d-e303-4889-9f19-b30b6bc57340',
    collaborator_name: 'Google Suite',
    is_active: false,
  },
  {
    id: 'c3c86f15-5ab6-42ce-9666-ac08e86a4545',
    access_permission_types_id: 'c5ca5ae6-bd2d-4a0d-92df-2337ecae11d8',
    permission_type: 'READ',
    trust_groups_id: '2',
    trust_group_name: 'Top 1000',
    departments_id: 'c1faba5e-9d82-45a3-89a0-faa21f207a6a',
    department_name: 'Legal',
    collaborators_id: 'c148171d-e303-4889-9f19-b30b6bc57340',
    collaborator_name: 'Google Suite',
    is_active: false,
  },
  {
    id: 'c3c86f15-5ab6-42ce-9666-ac08e86a4545',
    access_permission_types_id: 'c5ca5ae6-bd2d-4a0d-92df-2337ecae11d8',
    permission_type: 'COMMENT',
    trust_groups_id: '3',
    trust_group_name: 'Top 3000',
    departments_id: 'c1faba5e-9d82-45a3-89a0-faa21f207a6a',
    department_name: 'Legal',
    collaborators_id: 'c148171d-e303-4889-9f19-b30b6bc57340',
    collaborator_name: 'Google Suite',
    is_active: false,
  },
  {
    id: 'c3c86f15-5ab6-42ce-9666-ac08e86a4545',
    access_permission_types_id: 'c5ca5ae6-bd2d-4a0d-92df-2337ecae11d8',
    permission_type: 'TRANSFER OWNERSHIP',
    trust_groups_id: '4',
    trust_group_name: 'Do not trust',
    departments_id: 'c1faba5e-9d82-45a3-89a0-faa21f207a6a',
    department_name: 'Legal',
    collaborators_id: 'c148171d-e303-4889-9f19-b30b6bc57340',
    collaborator_name: 'Google Suite',
    is_active: false,
  },
];

describe('Helper Functions', () => {
  it('FixDomainRowTrustGroup', () => {
    const result = FixDomainRowTrustGroup(ROW_TRUSTGROUP_DATA);
    expect(result[0].trustGroup.label).toBe(ROW_TRUSTGROUP_DATA[0].trustGroup);
  });

  it('UpdateTrustGroups', () => {
    const result = UpdateTrustGroups(TRUSTGROUP_ARRAY);
    expect(result[0].label).toBe(TRUSTGROUP_ARRAY[0].name);
  });

  it('UpdateDomainsValue', () => {
    const result = UpdateDomainsValue(ROW_TRUSTGROUP_DATA, {
      domain: 'Google',
      trustGroup: 'Top 100',
    });
    expect(result[0].domain).toBe('Google');
  });

  it('FixDomainRow', () => {
    const result = FixDomainRow(ROW_TRUSTGROUP_DATA);
    expect(result[0].relationship.label).toBe(ROW_TRUSTGROUP_DATA[0].relationship);
  });

  it('CreateTrustGroupPermissionArray', () => {
    const result = CreateTrustGroupPermissionArray(PERMISSION_ARRAY_DATA, [
      { groupName: 'Top 100', id: '1' },
      { groupName: 'Top 1000', id: '2' },
      { groupName: 'Top 3000', id: '3' },
      { groupName: 'Do not trust', id: '4' },
    ]);
    expect(result[0].editFile).toBe(false);
  });

  it('createUpdateTrustGroupParam', () => {
    const result1 = createUpdateTrustGroupParam(
      {
        trust_groups_id: 1,
        viewFileId: 1,
        viewFileAccessId: 1,
      },
      'viewFile',
      true,
    );
    const result2 = createUpdateTrustGroupParam(
      {
        trust_groups_id: 1,
        commentFileId: 1,
        commentFileAccessId: 1,
      },
      'commentFile',
      true,
    );
    const result3 = createUpdateTrustGroupParam(
      {
        trust_groups_id: 1,
        editFileId: 1,
        editFileAccessId: 1,
      },
      'editFile',
      true,
    );
    const result4 = createUpdateTrustGroupParam(
      {
        trust_groups_id: 1,
        transferFileId: 1,
        transferFileAccessId: 1,
      },
      'transferFile',
      true,
    );
    expect(result1.id).toBe(1);
    expect(result2.id).toBe(1);
    expect(result3.id).toBe(1);
    expect(result4.id).toBe(1);
  });

  it('createNewDomainName', () => {
    const result = createNewDomainName(data);
    expect(result).toBe("New Domain 5");
  });

  it('validateDomainName', () => {
    var component = mount(
      <DomainGrid list={data} trustGroups={TRUSTGROUP_ARRAY} setTotalRows={() => {}} />,
    );
    agGridReact = component.find(AgGridReact).instance();
    validateDomainName(data, node, agGridReact.api, agGridReact.columnApi);
  });
  it('getDomainCount', () => {
    const result = getDomainCount(data, node);
    expect(result).toBe(1);
  });

  it('getPermission', () => {
    getPermission(data);
  });
});
