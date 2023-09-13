import { Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import './LinksList.css'
import LinkItem from '../LinkItem/LinkItem'
import { ButtonPrimary } from '../theme/buttons'
import useLinks from '../../hooks/useLinks'
import NewLink from '../LinksFunctions/NewLink'

export default function LinksList () {
  const { links } = useLinks()
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)

  const handleCloseFromNew = () => setShowAddLinkModal(false)

  return (
      <Container className='d-flex row gap-3 w-100 m-auto linksContainer'>
        <Row className='col-12'>
          <ButtonPrimary onClick={() => setShowAddLinkModal(true)}>
            Agregar link +
          </ButtonPrimary>
        </Row>
        <Row className='d-flex gap-3'>
          {
            links.map(link => <LinkItem key={link._id} link={link} />)
          }
        </Row>
        <NewLink show={showAddLinkModal} onHide={handleCloseFromNew} />
      </Container>

  )
}
