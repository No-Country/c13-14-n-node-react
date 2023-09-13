import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import useSession from '@/hooks/useSession'
import { APP_URL_ADMIN } from '@/config/constants'
import Logo from '@/components/Logo'
import { useNavigate } from 'react-router-dom'
import { APP_URL_ACCOUNT } from '../../config/constants'
import { useNavigate } from 'react-router-dom'
import { APP_URL_ACCOUNT } from '../../config/constants';

export default function Toolbar ({ tab, setTab }) {
  const { user, logout } = useSession()
  const navigate = useNavigate()  const navigate = useNavigate()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={APP_URL_ADMIN}>
          <Logo fill='black' height='20px' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-underline">
            <Nav.Link active={tab === 1} onClick={() => setTab(1)}>Perfiles</Nav.Link>
            <Nav.Link active={tab === 2} onClick={() => setTab(2)} >Links</Nav.Link>
            <Nav.Link active={tab === 3} onClick={() => setTab(3)}>Apariencia</Nav.Link>
            <Nav.Link active={tab === 4} onClick={() => setTab(4)}>Configuración</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={user?.name || 'Usuario'} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate(APP_URL_ACCOUNT)}>Configuración</NavDropdown.Item>
              <NavDropdown.Divider onClick={logout}/>
              <NavDropdown.Item onClick={logout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
