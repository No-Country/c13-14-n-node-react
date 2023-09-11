import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import DeleteLink from '../LinksFunctions/DeleteLink'
import UpdateLink from '../LinksFunctions/UpdateLink'

export default function LinkItem ({ link }) {
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false)
  const handleCloseFromDelete = () => setShowDeleteLinkModal(false)

  const [showUpdateLinkModal, setShowUpdateLinkModal] = useState(false)
  const handleCloseFromUpdate = () => setShowUpdateLinkModal(false)

  return (
    <>
      <Card>
        <Card.Body className='px-3'>
          <div className='d-flex justify-content-between border rounded px-3 py-2 tittleContainer'>
            <Card.Title className='d-flex'>
              {link.name}
              <Button onClick={() => setShowUpdateLinkModal(link)} className='mx-3' variant=''>
                <MdOutlineModeEditOutline />
              </Button>
            </Card.Title>
            <Form.Check
              type='switch'
              id='custom-switch'
              defaultChecked={link.status}
              onChange={() => console.log('ups')}
            />
          </div>
          <div className='d-flex justify-content-between'>
            <Link to={link.urlEnlace}>
              <Card.Text className='m-2'>{link.urlEnlace}</Card.Text>
            </Link>
            <Button onClick={() => setShowDeleteLinkModal(link._id)} className='' variant=''>
              <FaTrashAlt />
            </Button>
          </div>
        </Card.Body>
      </Card>
      <DeleteLink show={showDeleteLinkModal} onHide={handleCloseFromDelete} linkId={showDeleteLinkModal} />
      <UpdateLink show={showUpdateLinkModal} onHide={handleCloseFromUpdate} data={showUpdateLinkModal} />
    </>
  )
}
