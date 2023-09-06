import { useEffect } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle } from '../../reducers/toggles.slice'
import SearchForm from './Search'
import ListProfiles from '../profiles/listProfiles'
import { getAllProfile } from '../../reducers/profile.slice'

export default function SideBar() {
    const dispatch = useDispatch()
    const { newProfile } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.session)
    const { toggle } = useSelector(state => state.toggle)

    useEffect(() => {
        dispatch(getAllProfile(user.id))
        console.log("first")
    }, [newProfile])

    const handleClose = () => {
        dispatch(setToggle(false))
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
