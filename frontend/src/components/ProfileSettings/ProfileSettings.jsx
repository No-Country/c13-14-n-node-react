import { Button, Container, Row, Table } from 'react-bootstrap'
import { ButtonPrimary } from '../theme/buttons'
import { useState } from 'react'
import NewUserManager from './NewUserManager'
import { FaTrashAlt } from 'react-icons/fa'
import { BsCheckCircleFill } from 'react-icons/bs'
import { BiSolidErrorCircle } from 'react-icons/bi'
import DeleteProfileDelegation from './DeleteProfileDelegation'
import useProfile from '../../hooks/useProfile'
import DeleteProfile from './DeleteProfile'

export const ProfileSettings = () => {
  // Agregar Perfiles
  const [showAddNewManagerModal, setShowAddNewManagerModal] = useState(false)
  const handleCloseFromNew = () => setShowAddNewManagerModal(false)

  const { profile } = useProfile()
  const [showDeleteProfileDelegationModal, setShowDeleteProfileDelegationModal] = useState(false)
  const handleCloseFromDelete = () => setShowDeleteProfileDelegationModal(false)

  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false)
  const handleCloseFromDeleteProfile = () => setShowDeleteProfileModal(false)
  return (
    <>
      <Container className='d-flex row gap-3 w-100 m-auto linksContainer'>
        <h2>Delegación de perfil</h2>
        <Row className='col-12'>
          <ButtonPrimary onClick={() => setShowAddNewManagerModal(true)}>
            Agregar +
          </ButtonPrimary>
        </Row>
        <Row className='d-flex gap-3'>
          {/* Mapear las delegaciones */}
          <Table striped bordered hover className="text-center align-middle">
            <thead>
              <tr>
                <th className='homeText'>Email</th>
                <th className='homeText'>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {profile.profileUsers.map(user => user.rol === 'manager' && (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>
                    {user.status === 'accepted'
                      ? (<BsCheckCircleFill style={{ color: 'green', fontSize: '30px' }} title="Aceptado" />)
                      : (<BiSolidErrorCircle style={{ color: 'red', fontSize: '30px' }} title="Pendiente" />
                        )}
                  </td>
                  <td>
                    <Button onClick={() => setShowDeleteProfileDelegationModal(profile._id)} className='btn btn-link'>
                      <FaTrashAlt style={{ color: 'black', fontSize: '25px' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Row>
        <NewUserManager show={showAddNewManagerModal} onHide={handleCloseFromNew} />
        <DeleteProfileDelegation show={showDeleteProfileDelegationModal} onHide={handleCloseFromDelete} />
        <DeleteProfile show={showDeleteProfileModal} onHide={handleCloseFromDeleteProfile} profileId={profile.id} />
      </Container>
      <Container className='d-flex row gap-3 w-100 m-auto linksContainer'>
        <h2>Eliminar perfil</h2>
        <h4>Haz click en el siguiente botón para eliminar el perfil actual</h4>
        <Button onClick={() => setShowDeleteProfileModal(profile.id)} className="w-50" variant='light' style={{ border: 'solid 1px', borderRadius: '20px' }}><b>Eliminar</b></Button>
      </Container>
    </>
  )
}
