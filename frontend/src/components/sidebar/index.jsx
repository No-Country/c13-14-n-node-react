import { Offcanvas } from 'react-bootstrap'
import SearchForm from './Search'
import ListProfiles from '../profiles/listProfiles'
import useProfile from '../../hooks/useProfile'

export default function SideBar () {
  const { toggle, setToggle } = useProfile()
  const handleClose = () => {
    setToggle(false)
  }

  return (
        <div>
            <Offcanvas show={toggle} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Perfiles</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column align-items-center'>
                    <SearchForm />
                    <ListProfiles />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
  )
}
