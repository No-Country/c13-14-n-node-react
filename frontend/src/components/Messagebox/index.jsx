import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useLanguage from '../../hooks/useLanguage'

function Messagebox ({ title, body, onClose, show, setShow }) {
  const { dictionaryWord } = useLanguage('messageBox')

  const handleClose = () => {
    setShow(false)
    onClose()
  }

  return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {dictionaryWord('button')}
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Messagebox
