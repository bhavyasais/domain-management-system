import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import LandingPage from '../../pages/LandingPage/LandingPage';
import store from '../../redux/store';

describe('CollabModal', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(
      <Provider store={store}>
        <LandingPage />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
