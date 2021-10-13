import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Dashboard from './Dashboard';
export default {
  component: Dashboard,
  title: 'Templates/Dashboard',
  decorators: [withKnobs],
};

export const dashboard = () => <Dashboard />;
