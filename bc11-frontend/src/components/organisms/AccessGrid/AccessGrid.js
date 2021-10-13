import React, { useCallback, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '../../atoms/Button/ButtonAtom';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import TrustGroupService from '../../../services/TrustGroupService';
import {
  CreateTrustGroupPermissionArray,
  createUpdateTrustGroupParam,
  getPermission,
} from '../../../utils/helper';
import DomainService from '../../../services/DomainService';
import GoogleSuiteService from '../../../services/GoogleSuiteService';

const styles = () => ({
  addNewRow: {
    height: '36px',
    width: '690',
    border: '1px solid #cccccc',
    borderTop: '0',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    backgroundColor: '#ffffff',
  },
  buttonLabelStyle: {
    color: '#1d4cd7',
    textTransform: 'none',
  },
});

const AccessGrid = ({
  classes,
  setSelectedRows,
  index,
  setTotalRows,
  trustGroups,
  deptId,
  addTrustGroup,
  updateTrustGroup,
}) => {
  const [gridApi, setGridApi] = useState(null); // NOSONAR
  const [gridColumnApi, setGridColumnApi] = useState(null); // NOSONAR
  const [list, setList] = useState([]);

  const totalHeigh = list.length * 40 + 51.4;

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const updateAccess = async (item, colId, checked) => {
    const params = createUpdateTrustGroupParam(item, colId, checked);

    params.collaborators_id = localStorage.getItem('Collaboration');
    params.departments_id = JSON.parse(localStorage.getItem('dept')).id;

    const googleObj = {
      departmentName: JSON.parse(localStorage.getItem('dept')).name,
      type: 'domain',
      permissionType: localStorage.getItem(item.trustGroupName),
    };

    try {
      await TrustGroupService.updateTrustGroupAccess(params);

      const domains = await DomainService.getAllDomainsForDepartment({
        collaborators_id: localStorage.getItem('Collaboration'),
        departments_id: JSON.parse(localStorage.getItem('dept')).id,
      });

      googleObj.clients = domains
        .filter((domainObj) => domainObj.trustGroupName === item.trustGroupName)
        .map((obj) => obj.domain_name);
      console.log('google,', googleObj);

      await GoogleSuiteService.changePermission(googleObj);
    } catch (error) {
      console.warn('Error in updating trustgroup Access : ', error);
    }
  };

  const clickedCheckbox = (e, params) => {
    const { checked } = e.target;
    const { colId } = params.column;
    params.node.setDataValue(colId, checked);
    const newAarray = [...params.list];
    newAarray[params.rowIndex] = params.data;
    getPermission(newAarray);
    setList(newAarray);
    updateAccess(params.data, colId, checked);
  };

  const checkboxRenderer = (params) => {
    return (
      <div>
        <input type="checkbox" onClick={(e) => clickedCheckbox(e, params)} checked={params.value} />
      </div>
    );
  };

  const headerRenderer = (params) => {
    const name = params.displayName;
    return (
      <div>
        <input type="checkbox" onClick={() => clickedCheckbox(params)} />
        <label>{name}</label>
      </div>
    );
  };

  const fetchAllPermissions = useCallback(async () => {
    try {
      const result = await TrustGroupService.getAllTrustGroupsWithPermissions({
        collaborators_id: localStorage.getItem('Collaboration'),
        departments_id: deptId,
      });
      const permissionArray = CreateTrustGroupPermissionArray(result, trustGroups); // This should ideally be handled by backend
      setList([...permissionArray]);
    } catch (error) {
      console.warn('Error in fetch Access permissions : ', error);
    }
  }, [trustGroups, deptId]);

  useEffect(() => {
    fetchAllPermissions();
  }, [fetchAllPermissions]);

  useEffect(() => {
    gridApi?.refreshCells();
  }, [list]);

  useEffect(() => {
    setTotalRows((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = list.length;
      return newArray;
    });
  }, [list, index]);

  const handleOnSelectionChanged = () => {
    const selected = gridApi.getSelectedRows().length;
    setSelectedRows((prevArrray) => {
      const newArray = [...prevArrray];
      newArray[index] = selected;
      return newArray;
    });
  };

  function createNewTrustGroup() {
    let groupName = 'Top 10';
    while (trustGroups.find((item) => item.groupName === groupName)) {
      groupName += '0';
    }
    return groupName;
  }

  const addNewTrustGroup = () => {
    const newItems = createNewTrustGroup();
    addTrustGroup(newItems);
  };

  const handleCellEditingStopped = (param) => {
    if (param.oldValue !== param.newValue) {
      updateTrustGroup(param.data);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', flex: 1 }}>
      <div
        style={{
          height: list?.length !== 0 ? totalHeigh : '360px',
          width: '1091px',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          rowSelection="multiple"
          rowDragManaged
          getRowHeight={() => 40}
          onGridReady={onGridReady}
          rowData={list}
          onSelectionChanged={handleOnSelectionChanged}
          onSortChanged={() => {
            gridApi.refreshCells();
          }}
          onRowDragEnd={() => {
            gridApi.refreshCells();
          }}
          onCellEditingStopped={handleCellEditingStopped}
        >
          <AgGridColumn
            headerName="S no"
            valueGetter="node.rowIndex + 1"
            width={78}
            lockPosition="true"
            rowDrag
          />
          <AgGridColumn headerName="A Trust Group" field="trustGroupName" editable />
          <AgGridColumn
            headerName="Edit File?"
            field="editFile"
            cellRendererFramework={checkboxRenderer}
            cellRendererParams={{
              list,
            }}
            headerComponentFramework={headerRenderer}
          />
          <AgGridColumn
            headerName="View File?"
            field="viewFile"
            cellRendererFramework={checkboxRenderer}
            cellRendererParams={{
              list,
            }}
            headerComponentFramework={headerRenderer}
          />
          <AgGridColumn
            headerName="Comment on File?"
            field="commentFile"
            cellRendererFramework={checkboxRenderer}
            cellRendererParams={{
              list,
            }}
            headerComponentFramework={headerRenderer}
          />
          <AgGridColumn
            headerName="Transfer ownership of File?"
            field="transferFile"
            cellRendererFramework={checkboxRenderer}
            cellRendererParams={{
              list,
            }}
            headerComponentFramework={headerRenderer}
          />
        </AgGridReact>
        <div className={classes.addNewRow}>
          <Button
            variant="text"
            className={classes.button}
            startIcon={<AddIcon />}
            disableRipple
            value="New row"
            labelStyle={classes.buttonLabelStyle}
            onClick={addNewTrustGroup}
            textVariant="caption"
          />
        </div>
      </div>
    </div>
  );
};

AccessGrid.propTypes = {
  setSelectedRows: PropTypes.func,
  index: PropTypes.number.isRequired,
  setTotalRows: PropTypes.func,
  trustGroups: PropTypes.arrayOf(PropTypes.string),
};
AccessGrid.defaultProps = {
  setSelectedRows: () => {},
  setTotalRows: () => {},
  trustGroups: [],
};

export default withStyles(styles)(AccessGrid);
