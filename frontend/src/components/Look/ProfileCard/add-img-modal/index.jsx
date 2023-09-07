import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AvatarExposure from '../avatar-exposure'

function AddImgModal() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      
      <Button variant="warning" style={{display: "flex",  flexDirection: "column", margin: "15px 0", padding: "15px 15px"}} className='btn btn-block' onClick={handleShow}>
        CARGAR IMAGEN
      </Button>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sube Tu Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '300px', background: "#999"}}><AvatarExposure />.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Cambios
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddImgModal

