import { Button, Modal } from 'react-bootstrap'
import useLinks from '../../hooks/useLinks'
import toast, { Toaster } from 'react-hot-toast'

export default function DeleteLink ({ show, onHide, linkId }) {
  const { deleteLink } = useLinks()

  const handleDeleteLink = async (event) => {
    event.preventDefault()
    const res = await deleteLink(linkId)
    res.solved ? handleSolved() : toast.error(res.payload.message)
  }

  const handleSolved = () => {
    toast.success('Link eliminado con éxito...', { position: 'top-center' })
    setTimeout(onHide, 1000)
  }

  return (
    <Modal show={show} onHide={onHide}>
              <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Modal.Header className='modalHeader' closeButton>
        <Modal.Title className='modalTitle'>
          <strong>Confirmar Eliminación</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalBody py-4'>
        ¿Estás seguro de eliminar este link?
      </Modal.Body>
      <Modal.Footer className='modalBody'>
        <Button variant='secondary' onClick={onHide}>
          Cancelar
        </Button>
        <Button variant='danger' onClick={handleDeleteLink}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
