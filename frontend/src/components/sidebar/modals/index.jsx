import { useForm } from 'react-hook-form'
import { Button, Form, Modal } from 'react-bootstrap'
import useLanguage from '../../../hooks/useLanguage'
// import { createProfile, getAllProfile } from '../../../reducers/profile.slice'
import useUser from '../../../hooks/useUser'

const ModalNewProfile = ({ show, handleClose }) => {
  const { user } = useUser()
  const { dictionaryWord } = useLanguage('registerPage')
  const {
    register,
    handleSubmit
  } = useForm()

  const onSubmit = async (data) => {
    data.user = user.id
    if (data.nameSpace !== '') {
      // dispatch(createProfile(data))
    }
  }

  return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} className="mb-3" >
                    <Form.Label>{dictionaryWord('profile')}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={dictionaryWord('profilePlaceholder')}
                        {...register('nameSpace')}
                    />
                    <div className='d-flex flex-row-reverse  mt-4'>
                        <Button className='ml-4' type='submit' variant="primary" onClick={handleClose}>
                            Guardar cambios
                        </Button>
                        <Button className='mx-2' variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>

                    </div>
                </Form>
            </Modal.Body>
        </Modal>
  )
}

export default ModalNewProfile
