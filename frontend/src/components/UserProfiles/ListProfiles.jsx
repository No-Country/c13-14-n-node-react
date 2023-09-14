import { Container, Row } from 'react-bootstrap'
import { ButtonPrimary } from '../theme/buttons'
import useUser from '../../hooks/useUser'
import useProfile from '../../hooks/useProfile'
import ItemProfile from './ItemProfile'
import NewProfile from './NewProfile'
import { useState } from 'react'

export default function ListProfiles ({ setTab }) {
  const { user } = useUser()
  const [show, setShow] = useState(false)
  const { profile, profileSelection, addProfile } = useProfile()
  const { userProfiles } = user

  const handleClose = () => setShow(false)

  const handleSelection = (id) => {
    if (id === profile.id) return
    profileSelection(id)
    setTab(2)
  }

  return (
    <Container className='d-flex row gap-3'>
        <Row className='col-12'>
          <ButtonPrimary onClick={() => setShow(true)}>
            Agregar perfil
          </ButtonPrimary>
        </Row>
        <Row className='d-flex gap-3 app-section p-3'>
          {userProfiles.map(profile =>
            <ItemProfile
              key={profile.id}
              profile={profile}
              handleSeleccion = {handleSelection}
            />
          )}
        </Row>
        <NewProfile show={show} onHide={handleClose} addProfile={addProfile} />
      </Container>
  )
}
