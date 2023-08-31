import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function LinkItem ({ link }) {
  const { title, url, enabled } = link

  return (
    <Card>
      <Card.Body className='d-flex justify-content-between '>
        <div>
          <Card.Title>{title}</Card.Title>
            <Link>
              <Card.Text>
                {url}
              </Card.Text>
            </Link>
          </div>
          <div className='d-flex gap-3 flex-column justify-content-center align-items-end '>
            <Form.Check
              type="switch"
              id="custom-switch"
              value={enabled}
            />
            <Button variant="outline-primary">Editar</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
