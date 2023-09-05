import { Button, Container, Row } from 'react-bootstrap'

import LinkItem from '../LinkItem'
import useLinks from '../../hooks/useLinks'

export default function LinkList () {
  const { links, addLink } = useLinks()

  const handleNewLink = () => {
  // MODAL
    const newLink = {
      id: 'sdfsfsfsfsdfsd444',
      name: 'Link3',
      urlEnlace: 'www.google.com.ar',
      order: 3
    }

    addLink(newLink)
  }

  return (
    <Container className='d-flex gap-3 flex-column '>
      <Row>
          <Button
            className='rounded-pill'
            onClick={handleNewLink}
          >
            Nuevo link
          </Button>
     </Row>
    <Row className='d-flex gap-3'>
      {links.map(link =>
        <LinkItem key={link.title} link={link}/>
      )}
      </Row>
    </Container>
  )
}
