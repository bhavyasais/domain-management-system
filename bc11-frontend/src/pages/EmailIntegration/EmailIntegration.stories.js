import React from 'react';
import { storiesOf } from '@storybook/react';
import EmailIntegration from './EmailIntegration';

storiesOf('Templates/Email Integration Page', module).add('Email Integration Page', () => (
  <EmailIntegration label="Centralized  Communication Command Center" />
));
