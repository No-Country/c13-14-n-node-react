import { Button, Modal } from 'react-bootstrap'
import useProfiles from '../../hooks/useProfile'
import toast, { Toaster } from 'react-hot-toast'

export default function DeleteProfile ({ show, onHide, profileId }) {
  const { deleteProfile } = useProfiles()

  const handleDeleteProfile = async (event) => {
    event.preventDefault()
    const res = await deleteProfile(profileId)
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
        ¿Estás seguro de eliminar este perfil? El cambio es irreversible
      </Modal.Body>
      <Modal.Footer className='modalBody'>
        <Button variant='secondary' onClick={onHide}>
          Cancelar
        </Button>
        <Button variant='danger' onClick={handleDeleteProfile}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
