import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { AgGridReact, AgGridColumn, AllCommunityModules } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import Chip from '../../atoms/Chip/Chip';
import ChipDropdown from '../ChipDropdown/ChipDropdown';
import Button from '../../atoms/Button/ButtonAtom';
import { RELATIONSHIP_COLORS } from '../../../utils/Strings';
import DomainService from '../../../services/DomainService';
import GoogleSuiteService from '../../../services/GoogleSuiteService';
import { createNewDomainName, getDomainCount, validateDomainName } from '../../../utils/helper';

const stylesRel = () => ({
  newRowContainerRel: {
    height: '36px',
    width: '690',
    border: '1px solid #cccccc',
    borderTop: '0px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
  },
  dropDownStyleRel: {
    width: '200px',
    marginTop: '10px',
    zIndex: '999999999 !important',
    position: 'relative',
  },
  labelStyleRel: {
    color: '#1d4cd7',
    textTransform: 'none',
  },
  gridContainerRel: {
    overflow: 'visible',
    zIndex: '0',
  },
  fullRowRel: {
    fontSize: '12px',
    color: '#666666',
    marginBottom: '4px',
  },
});

const RelationshipGrid = ({
  relationships,
  classes,
  selectedRows,
  setSelectedRows,
  index,
  setTotalRows,
  deptId,
  trustGroup,
  list,
  setList,
  updateDomain,
}) => {
  const [gridApi, setGridApi] = useState(null); // NOSONAR
  const [gridColumnApi, setGridColumnApi] = useState(null); // NOSONAR

  const rowData = list.filter((item) => item.trustGroupName === trustGroup.groupName);
  const totalHeigh = rowData.length * 40 + relationships.length + 201;

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const ChipRenderer = ({ value }) => {
    return (
      <Grid item xs={6}>
        <Chip label={value} backgroundColor={RELATIONSHIP_COLORS[value]} />
      </Grid>
    );
  };

  const ChipsDropDownRenderer = React.forwardRef(({ value, chipsList }, ref) => {
    const [currentValue, setCurrentValue] = useState(value);
    const handleChipChange = (item) => {
      if (item.groupName) {
        setCurrentValue(item.groupName);
      }
    };

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return currentValue;
      },
      isPopup: () => {
        return true;
      },
    }));

    return (
      <ChipDropdown
        list={chipsList}
        selectedValue={value}
        onDropDownChange={handleChipChange}
        ref={ref}
        customStyle={classes.dropDownStyleRel}
      />
    );
  });

  const getRowHeight = (params) => {
    if (params.data) {
      return 40;
    }
    return 52;
  };

  function createNewRowData() {
    const newData = {
      domain_name: createNewDomainName(list),
      trust_score: 0,
      address: 'default Address',
      relationship: 'Customer',
      created_by: 'Test User',
      trust_groups_id: trustGroup.id,
      departments_id: deptId,
      collaborators_id: localStorage.getItem('Collaboration'),
    };
    return newData;
  }

  const addNewDomain = async (params) => {
    try {
      const result = await DomainService.addNewDomain(params);
      gridApi.applyTransaction({
        add: [result],
      });
     await GoogleSuiteService.changePermission({
        departmentName: JSON.parse(localStorage.getItem('dept')).name,
        type: 'domain',
        permissionType: localStorage.getItem(trustGroup?.groupName),
        clients: [result.domain_name],
      });
      setList((prevData) => [...prevData, result]);
    } catch (error) {
      console.warn('error in adding domain: ', error);
    }
  };

  const addItems = () => {
    const newItems = createNewRowData();
    addNewDomain(newItems);
  };

  useEffect(() => {
    setTotalRows((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = list.length;
      return newArray;
    });
  }, [list, index]);


  const onSelectionChanged = () => {
    const selected = gridApi.getSelectedRows().length;
    setSelectedRows((prevArrray) => {
      const newArray = [...prevArrray];
      newArray[index] = selected;
      return newArray;
    });
  };

  const handleCellEditingStopped = (node) => {
    if(node?.newValue?.trim()===node?.oldValue?.trim()){
      var count =getDomainCount(list,node)
      if(count>1){
      validateDomainName(list,node,gridApi,gridColumnApi)
      }
    }
    if(node.oldValue !== node.newValue){
    validateDomainName(list,node,gridApi,gridColumnApi)
    }
    updateDomain(node.data);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          height: list?.length !== 0 ? totalHeigh : '360px',
          width: '680px',
        }}
        className={clsx('ag-theme-alpine', classes.gridContainer)}
      >
        <AgGridReact
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            zIndex: 0,
            overflow: 'visible',
            editable: true,
          }}
          rowSelection="multiple"
          rowDragManaged
          animateRows
          suppressRowTransform
          getRowHeight={getRowHeight}
          onGridReady={onGridReady}
          rowData={rowData}
          modules={AllCommunityModules}
          onCellEditingStopped={handleCellEditingStopped}
          onSelectionChanged={onSelectionChanged}
          onSortChanged={() => {
            gridApi.refreshCells();
          }}
        >
          <AgGridColumn
            headerName="S no"
            valueGetter="node.rowIndex + 1"
            width={78}
            lockPosition="true"
            rowDrag
          />
          <AgGridColumn headerName="Domain" field="domain_name" />
          <AgGridColumn headerName="Trust Score" field="trust_score" />
          <AgGridColumn
            headerName="Relationship"
            field="relationship"
            cellRendererFramework={ChipRenderer}
            cellEditorFramework={ChipsDropDownRenderer}
            cellEditorParams={{
              chipsList: relationships,
            }}
            cellStyle={{
              overflow: 'visible',
            }}
          />
        </AgGridReact>
        <div className={classes.newRowContainerRel}>
          <Button
            variant="text"
            className={classes.button}
            startIcon={<AddIcon />}
            disableRipple
            value="New row"
            labelStyle={classes.labelStyleRel}
            onClick={addItems}
            textVariant="caption"
          />
        </div>
      </div>
    </div>
  );
};

RelationshipGrid.propTypes = { onDataChange: PropTypes.func };
RelationshipGrid.defaultProps = { onDataChange: () => {} };

export default withStyles(stylesRel)(RelationshipGrid);
