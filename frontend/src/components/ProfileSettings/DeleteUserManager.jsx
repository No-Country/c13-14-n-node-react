import { Button, Modal } from 'react-bootstrap'
import useProfiles from '../../hooks/useProfile'
import toast, { Toaster } from 'react-hot-toast'

export default function DeleteUserManager ({ show, onHide, profileId }) {
  const { deleteUserManager } = useProfiles()

  const handleDeleteProfile = async (event) => {
    event.preventDefault()
    console.log(profileId)
    const res = await deleteUserManager(profileId)
    console.log(res)
    if (res.solved) {
      handleSolved()
    } else {
      toast.error(res.payload.message)
    }
  }

  const handleSolved = () => {
    toast.success('Perfil eliminado con éxito...', { position: 'top-center' })
    setTimeout(() => {
      onHide()
    }, 1000)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Modal.Header className="modalHeader" closeButton>
        <Modal.Title className="modalTitle">
          <strong>Confirmar Eliminación</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody py-4">
        ¿Estás seguro de eliminar esta delegación? El cambio es irreversible.
      </Modal.Body>
      <Modal.Footer className="modalFooter">
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteProfile}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
