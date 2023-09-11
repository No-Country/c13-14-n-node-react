import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import ModalNewProfile from '../modals'
import useProfile from '../../../hooks/useProfile'

export default function SearchForm () {
  const [show, setShow] = useState(false)
  const { toggle, setToggle } = useProfile()

  const handleClose = (toggle) => {
    if (toggle) {
      setToggle(false)
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
