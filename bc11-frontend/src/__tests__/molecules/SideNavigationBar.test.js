import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SideNavigationBar from '../../components/molecules/SideNavigationBar/SideNavigationBar';

describe('<SideNavigationBar/>', () => {
  const history = { push: jest.fn() };
  let mounted;
  let onClick;
  beforeEach(() => {
    onClick = jest.fn();
    act(() => {
      mounted = mount(<SideNavigationBar onClick={onClick} history={history} />);
    });
  });

  it('Renders correctly', () => {
    let wrapper;
    wrapper = renderer.create(
      <SideNavigationBar header="io" onClick={onClick} history={history} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("onClick does'nt works on clicking inactive icon", () => {
    mounted.find('img').at(0).props().onClick();
    expect(onClick).not.toHaveBeenCalled();
  });
});
