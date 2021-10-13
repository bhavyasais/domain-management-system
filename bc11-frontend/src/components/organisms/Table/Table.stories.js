import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Table from './Table';

export default {
  component: Table,
  title: 'Organisms/Table',
  decorators: [withKnobs],
};

function createData(Mails, ID, Domain, RecievedFrom, TrustScore, Group, ThreatType, Details) {
  return { Mails, ID, Domain, RecievedFrom, TrustScore, Group, ThreatType, Details };
}

const rows = [
  createData(
    'sample@gmail.com',
    '#1',
    'Zemosolabs',
    'sample user',
    22,
    'Do not trust',
    'Spam',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#2',
    'Zemosolabs',
    'sample user',
    52,
    'Trusted',
    'Inbox',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#3',
    'Zemosolabs',
    'sample user',
    22,
    'Do not trust',
    'Spam',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#4',
    'Zemosolabs',
    'sample user',
    52,
    'Trusted',
    'Inbox',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#5',
    'Zemosolabs',
    'sample user',
    22,
    'Do not trust',
    'Spam',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#6',
    'Zemosolabs',
    'sample user',
    52,
    'Trusted',
    'Inbox',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#7',
    'Zemosolabs',
    'sample user',
    22,
    'Do not trust',
    'Spam',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#8',
    'Zemosolabs',
    'sample user',
    52,
    'Trusted',
    'Inbox',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#9',
    'Zemosolabs',
    'sample user',
    22,
    'Do not trust',
    'Spam',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#10',
    'Zemosolabs',
    'sample user',
    52,
    'Trusted',
    'Inbox',
    'View Details',
  ),
  createData(
    'sample@gmail.com',
    '#11',
    'Zemosolabs',
    'sample user',
    22,
    'Do not trust',
    'Spam',
    'View Details',
  ),
];
const headCells = [
  { id: 'Mails', numeric: false, disablePadding: true, label: 'Mails' },
  { id: 'ID', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'Domain', numeric: false, disablePadding: false, label: 'Domain' },
  { id: 'RecievedFrom', numeric: false, disablePadding: false, label: 'Recieved from' },
  { id: 'TrustScore', numeric: true, disablePadding: false, label: 'Trust score' },
  { id: 'Group', numeric: false, disablePadding: false, label: 'Group' },
  { id: 'ThreatType', numeric: false, disablePadding: false, label: 'Threat type' },
  { id: 'Details', numeric: false, disablePadding: false, label: '' },
];

const onDetailsClick = (id) => {
  console.log('Id of clicked row => ', id);
};
const onSelectionClick = (arr) => {
  console.log('Array of selected rows Id', arr);
};
export const table = () => (
  <Table
    rows={rows}
    headCells={headCells}
    onDetailsClick={onDetailsClick}
    onSelectionClick={onSelectionClick}
  />
);
