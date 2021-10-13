import { RELATIONSHIP_COLORS, TRUSTGROUP_COLORS } from './Strings';

export const FixDomainRowTrustGroup = (array) =>
  array.map((row, idx) => ({
    ...row,
    trustGroup: {
      backgroundColor: TRUSTGROUP_COLORS[row?.trustGroup],
      label: row?.trustGroup,
      idx,
    },
  }));

export const UpdateTrustGroups = (array) =>
  array.map((value) => ({
    backgroundColor: TRUSTGROUP_COLORS[value.name] ?? '#eeeeee',
    label: value.name,
  }));

export const UpdateDomainsValue = (array, data) => {
  const newData = array.map((row) => {
    return row.id === data.id ? { ...data } : { ...row };
  });
  return newData;
};

export const FixDomainRow = (array) =>
  array.map((row) => ({
    ...row,
    relationship: {
      backgroundColor: RELATIONSHIP_COLORS[row?.relationship],
      label: row?.relationship,
    },
  }));

export const CreateTrustGroupPermissionArray = (array, trustgroups) => {
  const newArray = Array.from({ length: trustgroups.length }, () => ({}));

  trustgroups.forEach((obj, idx) => {
    newArray[idx].trustGroupName = obj.groupName;
    newArray[idx].trust_groups_id = obj.id;
    newArray[idx].viewFile = false;
    newArray[idx].commentFile = false;
    newArray[idx].editFile = false;
    newArray[idx].transferFile = false;
  });

  const finalArray = newArray.map((obj) => {
    const newObj = obj;
    const matchedObjects = array.filter((item) => item.trust_group_name === obj.trustGroupName);
    matchedObjects.forEach((item) => {
      if (item.permission_type === 'READ') {
        newObj.viewFile = item.is_active;
        newObj.viewFileId = item.id;
        newObj.viewFileAccessId = item.access_permission_types_id;
      } else if (item.permission_type === 'COMMENT') {
        newObj.commentFile = item.is_active;
        newObj.commentFileId = item.id;
        newObj.commentFileAccessId = item.access_permission_types_id;
      } else if (item.permission_type === 'EDIT') {
        newObj.editFile = item.is_active;
        newObj.editFileId = item.id;
        newObj.editFileAccessId = item.access_permission_types_id;
      } else if (item.permission_type === 'TRANSFER OWNERSHIP') {
        newObj.transferFile = item.is_active;
        newObj.transferFileId = item.id;
        newObj.transferFileAccessId = item.access_permission_types_id;
      }
    });
    return newObj;
  });
  return finalArray;
};

export const createUpdateTrustGroupParam = (item, colId, checked) => {
  const newObj = {};
  newObj.is_active = checked;
  newObj.trust_groups_id = item.trust_groups_id;

  if (colId === 'viewFile') {
    newObj.id = item.viewFileId;
    newObj.access_permission_types_id = item.viewFileAccessId;
  } else if (colId === 'commentFile') {
    newObj.id = item.commentFileId;
    newObj.access_permission_types_id = item.commentFileAccessId;
  } else if (colId === 'editFile') {
    newObj.id = item.editFileId;
    newObj.access_permission_types_id = item.editFileAccessId;
  } else if (colId === 'transferFile') {
    newObj.id = item.transferFileId;
    newObj.access_permission_types_id = item.transferFileAccessId;
  }
  return newObj;
};

export const getPermission = (array) => {
  array.forEach((item) => {
    if (item?.transferFile) {
      localStorage.setItem(item.trustGroupName, 'writer');
    } else if (item?.editFile) {
      localStorage.setItem(item.trustGroupName, 'writer');
    } else if (item?.commentFile) {
      localStorage.setItem(item.trustGroupName, 'commenter');
    } else if (item?.viewFile) {
      localStorage.setItem(item.trustGroupName, 'reader');
    } else {
      localStorage.setItem(item.trustGroupName, 'none');
    }
  });
};

export const createNewDomainName=(list) =>{
  let domain_name = 'New Domain';
  while (list?.find((item) => item?.domain_name === domain_name)) {
    domain_name = domain_name.concat(" ",list.length);
  }
  return domain_name;
}

export const validateDomainName=(list, node, gridApi, gridColumnApi) =>{
  if (node?.column?.colId === 'domain_name') {
    if (list?.find((item) => item?.domain_name?.trim() === node?.data?.domain_name?.trim())) {
      gridApi.startEditingCell({
        rowIndex: node?.rowIndex,
        colKey:gridColumnApi?.getAllColumns()?.[1]?.colId,
      });
    }
  }
}

export const getDomainCount=(list, node)=> {
  var count = 0;
  for (var i = 0; i < list.length; i++) {
    if (list?.[i]?.domain_name.trim() === node?.oldValue.trim()){ count++}
  }
  return count;
}
