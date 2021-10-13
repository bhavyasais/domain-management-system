import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { AgGridReact, AgGridColumn, AllCommunityModules } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import Chip from '../../atoms/Chip/Chip';
import { createNewDomainName, getDomainCount, UpdateDomainsValue, validateDomainName } from '../../../utils/helper';
import ChipDropdown from '../ChipDropdown/ChipDropdown';
import Button from '../../atoms/Button/ButtonAtom';
import { TRUSTGROUP_COLORS } from '../../../utils/Strings';
import DomainService from '../../../services/DomainService';
import GoogleSuiteService from '../../../services/GoogleSuiteService';
const styles = () => ({
  newRowContainer: {
    height: '36px',
    width: '690',
    border: '1px solid #cccccc',
    borderTop: '0px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
  },
  dropDownStyle: {
    width: '200px',
    marginTop: '10px',
    zIndex: '999999999 !important',
    position: 'relative',
  },
  labelStyle: {
    color: '#1d4cd7',
    textTransform: 'none',
  },
  gridContainer: {
    overflow: 'visible',
    zIndex: '0',
  },
  fullRow: {
    fontSize: '12px',
    color: '#666666',
    marginBottom: '4px',
  },
});

const DomainGrid = ({
  trustGroups,
  classes,
  setSelectedRows,
  index,
  setTotalRows,
  deptId,
  list,
  setList,
  updateDomain,
  deptName,
}) => {
  const [gridApi, setGridApi] = useState(null); // NOSONAR
  const [gridColumnApi, setGridColumnApi] = useState(null); // NOSONAR
  const [currentrow, setCurrentrow] = useState({});

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const ChipRenderer = ({ value }) => {
    return (
      <Grid item xs={6}>
        <Chip label={value} backgroundColor={TRUSTGROUP_COLORS[value]} />
      </Grid>
    );
  };

  const ChipRendererGroup = ({ node }) => {
    const { key } = node;
    return (
      <Grid container direction="row" style={{ width: '250px' }} justify="space-between">
        <Grid item container direction="column" xs={6}>
          <Grid item className={classes.fullRow}>
            Group
          </Grid>

          <Grid item>
            <Chip label={key} backgroundColor={TRUSTGROUP_COLORS[key]} />
          </Grid>
        </Grid>
        <Grid item container direction="row" xs={6} alignItems="center" justify="center">
          <Grid item className={classes.fullRow}>
            Count {node.childrenAfterFilter.length}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const ChipsDropDownRenderer = React.forwardRef(({ value, data, chipsList }, ref) => {
    const [currentValue, setCurrentValue] = useState(value);
    const handleChipChange = (currentGroup) => {
      if (currentGroup) {
        setCurrentValue(currentGroup.groupName);
      }
      setCurrentrow({
        ...data,
        trustGroupName: currentGroup.groupName,
        trust_groups_id: currentGroup.id,
      });
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
        customStyle={classes.dropDownStyle}
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
      trust_groups_id: trustGroups?.[0]?.id,
      departments_id: deptId,
      collaborators_id: localStorage.getItem('Collaboration'),
    };
    return newData;
  }

  const addNewDomain = async (params) => {
    try {
      const result = await DomainService.addNewDomain(params);
      gridApi.applyTransaction({
        add: [{ result }],
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

  const changeTrustGroup = async () => {
    if (currentrow) {
      const params = {
        id: currentrow.domainTrustGroupId,
        collaborators_id: currentrow.collaborators_id,
        departments_id: currentrow.departments_id,
        trust_groups_id: currentrow.trust_groups_id,
      };
      const googleObj = {
        departmentName: deptName,
        clients: [currentrow.domain_name],
        type: 'domain',
        permissionType: localStorage.getItem(currentrow.trustGroupName),
      };
      try {
        await DomainService.UpdateDomainTrustGroup(params);
        const res = await GoogleSuiteService.changePermission(googleObj);
        console.log('res of google service', res);
        const updateData = UpdateDomainsValue([...list], currentrow);
        gridApi.setRowData(updateData);
        setList(() => [...updateData]);
        setCurrentrow(null);
      } catch (error) {
        console.warn('Error in changing TrustGroup');
      }
    }
  };

  const handleCellEditingStopped = (node) => {
    if(node.newValue===node.oldValue){
      var count =getDomainCount(list,node)
      if(count>1){
      validateDomainName(list,node,gridApi,gridColumnApi)
      }
    }
    if(node.oldValue !== node.newValue){
    validateDomainName(list,node,gridApi,gridColumnApi)
    }
    if (node.column.colId === 'trustGroupName') {
      changeTrustGroup();
    } else {
      updateDomain(node.data);
    }
  };

  const totalHeigh = list.length * 40 + 40 * trustGroups.length + 251;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{ height: totalHeigh, width: '700px' }}
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
          suppressRowTransform
          getRowHeight={getRowHeight}
          onGridReady={onGridReady}
          rowData={[...list]}
          modules={AllCommunityModules}
          groupUseEntireRow
          groupDefaultExpanded={-1}
          frameworkComponents={{ groupRowInnerRenderer: ChipRendererGroup }}
          groupRowRendererParams={{
            innerRenderer: 'groupRowInnerRenderer',
            suppressCount: true,
          }}
          onCellEditingStopped={handleCellEditingStopped}
          onSelectionChanged={onSelectionChanged}
          onSortChanged={() => {
            gridApi.refreshCells();
          }}
          rowDragManaged
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
            headerName="Trust Group"
            field="trustGroupName"
            cellRendererFramework={ChipRenderer}
            editable
            cellEditorFramework={ChipsDropDownRenderer}
            cellEditorParams={{
              chipsList: trustGroups,
            }}
            cellStyle={{
              overflow: 'visible',
            }}
            rowGroup
          />
        </AgGridReact>
        <div className={classes.newRowContainer}>
          <Button
            variant="text"
            className={classes.button}
            startIcon={<AddIcon />}
            disableRipple
            value="New row"
            labelStyle={classes.labelStyle}
            onClick={addItems}
            textVariant="caption"
          />
        </div>
      </div>
    </div>
  );
};

DomainGrid.propTypes = {};
DomainGrid.defaultProps = { onDataChange: () => {} };

export default withStyles(styles)(DomainGrid);
