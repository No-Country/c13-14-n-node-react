import { Button, Modal } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

export default function DeleteProfileDelegation ({ show, onHide }) {
//   const { deleteDelegation } = useDelegations()

  const handleDeleteLink = async (event) => {
    event.preventDefault()
    // const res = await deleteDelegation()
    // res.solved ? handleSolved() : toast.error(res.payload.message)
  }

  //   const handleSolved = () => {
  //     toast.success('Delegación eliminada con éxito...', { position: 'top-center' })
  //     setTimeout(onHide, 1000)
  //   }

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
        ¿Estás seguro de eliminar esta delegación?
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
