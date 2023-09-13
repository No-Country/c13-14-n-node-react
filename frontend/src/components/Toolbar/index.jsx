import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { APP_URL_ADMIN } from '../../config/constants'
import Logo from '../logo'
import useSession from '../../hooks/useSession'
import { useDispatch } from 'react-redux'
import { setToggle } from '../../reducers/toggles.slice'

export default function AdminNavbar ({ setTab }) {
  const dispatch = useDispatch()
  const { user, logout } = useSession()

  const toggleSideBar = () => {
    dispatch(setToggle(true))
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={APP_URL_ADMIN}>
          <Logo fill='black' height='20px' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={toggleSideBar}>Perfiles</Nav.Link>
            <Nav.Link onClick={() => setTab(1)} >Links</Nav.Link>
            <Nav.Link onClick={() => setTab(2)}>Apariencia</Nav.Link>
            <Nav.Link onClick={() => setTab(3)}>Settings</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={user?.name || 'Usuario'} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">Configuración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
