import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import EmailIntegration from '../../pages/EmailIntegration/EmailIntegration';
import store from '../../redux/store';

describe('CollabModal', () => {
  const handleOnChange = jest.fn();
  it('should render correctly', () => {
    const wrapper = renderer.create(
      <Provider store={store}>
        <EmailIntegration handleOnChange={handleOnChange} onChange={handleOnChange} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
