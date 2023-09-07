import { Button, Container, Row } from 'react-bootstrap'

import LinkItem from '../LinkItem'

const links = [
  { title: 'YouTube - Midudev', url: 'https://www.youtube.com/@midulive', enabled: true },
  { title: 'Twitter - Midudev', url: 'https://twitter.com/midudev', enabled: true },
  { title: 'YouTube - Twich', url: 'https://www.twitch.tv/midudev', enabled: true }
]

export default function LinkList () {
  return (
    <Container className='d-flex gap-3 flex-column '>
      <Row>
          <Button className='rounded-pill'>Nuevo link</Button>
     </Row>
    <Row className='d-flex gap-3'>
      {links.map(link =>
        <LinkItem key={link.title} link={link}/>
      )}
      </Row>
    </Container>
  )
}
