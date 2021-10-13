import Graph from '../assets/atoms_icon_graph.svg';
import Pie from '../assets/atoms_icon_pie.svg';
import Sheet from '../assets/atoms_icon_excel.svg';
import Mail from '../assets/mail.png';
const sideNavIcons = [
  { icon: Pie, active: false },
  { icon: Graph, active: true },
  { icon: Mail, active: true },
  { icon: Sheet, active: false },
];

const getSideBarIcons = () => sideNavIcons;

const sideNavIconGetter = {
  getSideBarIcons,
};

export default sideNavIconGetter;
