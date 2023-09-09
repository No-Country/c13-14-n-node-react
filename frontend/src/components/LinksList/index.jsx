import { Container, Row } from 'react-bootstrap'
import { useState } from 'react'

import LinkItem from '../LinkItem'
import { ButtonPrimary } from '../theme/buttons'

import useLinks from '../../hooks/useLinks'
import NewLink from '../NewLink'

export default function LinkList () {
  const { links } = useLinks()
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)

  const handleCloseFromNew = () => setShowAddLinkModal(false)

  return (
      <Container className='d-flex row gap-3 w-100 m-auto '>
        <Row className='col-12'>
          <ButtonPrimary onClick={() => setShowAddLinkModal(true)}>
            Agregar link +
          </ButtonPrimary>
        </Row>
        <Row className='d-flex gap-3'>
          { // Se renderizan los links existentes
            links.map(link => <LinkItem key={link._id} link={link} />)
          }
        </Row>
        <NewLink show={showAddLinkModal} onHide={handleCloseFromNew} />
      </Container>

  )
}
