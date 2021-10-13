import CollabModal from '../../components/organisms/CollabModal/CollabModal';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Button from '../../components/atoms/Button/ButtonAtom';
import { DialogTemplate } from '../../components/templates/DialogTemplate/CollabCardsDialogTemplate';
import ButtonAtom from '../../components/atoms/Button/ButtonAtom';

describe('CollabModal', () => {
  let component;
  const handleClick = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(<CollabModal />);
    });
  });
  it('should render correctly', () => {
    let wrapper;
    wrapper = renderer.create(<CollabModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one button', () => {
    expect(component.find(Button)).toHaveLength(1);
  });
  it('renders Modal component', () => {
    expect(component.find(DialogTemplate).length).toEqual(1);
  });

  it("opens the modal", () => {
    const wrapper = mount(<CollabModal onClick={handleClick}/>);
    wrapper.find('ButtonAtom').at(0).props().onClick();
    wrapper.find('DialogTemplate').at(0).props().handleClose();
    wrapper.find('DialogTemplate').at(0).props().onClick();
    expect(handleClick).toHaveBeenCalled();
  });


});
