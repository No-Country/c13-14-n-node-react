import { Button, Container, Row, Table } from 'react-bootstrap'
import { ButtonPrimary } from '../theme/buttons'
import { useState } from 'react'
import { NewProfileDelegation } from './NewProfileDelegation'
import { FaTrashAlt } from 'react-icons/fa'
import { BsCheckCircleFill } from 'react-icons/bs'
import DeleteProfileDelegation from './DeleteProfileDelegation'

export const ProfileSettings = () => {
  // Agregar Perfiles
  const [showAddProfileDelegation, setShowAddProfileDelegation] = useState(false)

  const [showDeleteProfileDelegationModal, setShowDeleteProfileDelegationModal] = useState(false)
  const handleCloseFromDeleteD = () => setShowDeleteProfileDelegationModal(false)

  const handleCloseFromNew = () => setShowAddProfileDelegation(false)

  return (
    <>
      <Container className='d-flex row gap-3 w-100 m-auto linksContainer'>
        <h2>Delegación de perfil</h2>
        <Row className='col-12'>
          <ButtonPrimary onClick={() => setShowAddProfileDelegation(true)}>
            Agregar +
          </ButtonPrimary>
        </Row>
        <Row className='d-flex gap-3'>
          {/* Mapear las delegaciones */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='homeText text-center'>Email</th>
                <th className='homeText text-center'>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">guillermosantolaya@hotmail.com</td>
                <td className="text-center"><BsCheckCircleFill style={{ color: 'green', fontSize: '30px' }} /></td>
                <td className="text-center">
                  <Button onClick={() => setShowDeleteProfileDelegationModal(true)} className='' variant=''><FaTrashAlt style={{ color: 'red', fontSize: '25px' }}/></Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <DeleteProfileDelegation show={showDeleteProfileDelegationModal} onHide={handleCloseFromDeleteD}/>
        <NewProfileDelegation show={showAddProfileDelegation} onHide={handleCloseFromNew} />
      </Container>
      <Container className='d-flex row gap-3 w-100 m-auto linksContainer'>
        <h2>Eliminar perfil</h2>
        <h4>Haz click en el siguiente botón para eliminar tu perfil</h4>
        <Button variant='danger' style={{ borderRadius: '20px' }}>Eliminar</Button>
      </Container>
    </>
  )
}
