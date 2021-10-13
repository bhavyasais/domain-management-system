import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../../components/templates/Dashboard/Dashboard';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

describe('<Dashboard/>', () => {
  let mounted;
  const onChange = jest.fn();
  beforeEach(() => {
    act(() => {
      mounted = mount(
        <Dashboard
          handleGroupChange={onChange}
          handleTrustscoreChange={onChange}
          handleTabGroupChange={onChange}
          onDropdownChange={onChange}
        />,
      );
    });
  });

  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
