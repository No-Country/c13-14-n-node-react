import { Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle } from '../../reducers/toggles.slice'
import SearchForm from './Search'
import ListProfiles from '../profiles/listProfiles'

export default function SideBar() {
    const dispatch = useDispatch()
    const { toggle } = useSelector(state => state.toggle)

    const handleClose = () => dispatch(setToggle(false))
    return (
        <div>
            <Offcanvas show={toggle} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Perfiles</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SearchForm />
                    <ListProfiles />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
