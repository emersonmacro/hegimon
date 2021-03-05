import {
  Nav,
  Navbar as ReactstrapNavbar,
  NavItem,
  NavLink,
} from 'reactstrap'

import './Navbar.css'

interface INavbarProps {
  toggleStatsModal: any
  toggleAboutModal: any
}

const Navbar = ({ toggleStatsModal, toggleAboutModal }: INavbarProps) => (
  <ReactstrapNavbar
    className="app-navbar"
  >
    <span className="app-brand">Hegimon</span>
    <Nav>
      <NavItem>
        <NavLink
          className="app-nav-link"
          onClick={ () => toggleStatsModal() }
        >
          Total Stats
        </NavLink>
      </NavItem>
      <NavItem className="spacer">
        <NavLink
          className="app-nav-link"
          onClick={ () => toggleAboutModal() }
        >
          ?
        </NavLink>
      </NavItem>
    </Nav>
  </ReactstrapNavbar>
)

export default Navbar
