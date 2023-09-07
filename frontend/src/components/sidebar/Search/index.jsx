import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { setToggle } from '../../../reducers/toggles.slice'
import { useDispatch } from 'react-redux'
import ModalNewProfile from '../modals'

export default function SearchForm() {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const handleClose = (toggle) => {
        if (toggle) {
            dispatch(setToggle(false))
            setShow(false)
        }
    }
    const handleShow = () => {
        setShow(true)
    }
    return (
        <div>
            <Container className="">
                <form className='d-flex gap-3'>
                    <input type='text' placeholder="Buscar perfil..." className='form-control' />
                    <Button variant="primary" onClick={handleShow}>CREAR</Button>
                </form>
                <ModalNewProfile show={show} handleClose={handleClose} />
            </Container>
        </div>
    )
}
