import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useLink from '../../hooks/useLinks'

export default function LinkItem ({ link }) {
  const { title, url, enabled, id } = link
  const { deleteLink } = useLink()

  const handleDelete = () => {
    deleteLink(id)
  }

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
            <Button onClick={handleDelete} variant="outline-primary">Eliminar</Button>

        </div>
      </Card.Body>
    </Card>
  )
}
