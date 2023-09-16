import { useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import DeleteLink from '../LinksFunctions/DeleteLink'
import UpdateLink from '../LinksFunctions/UpdateLink'
import useLinks from '../../hooks/useLinks'
import './LinkItem.css'

export default function LinkItem ({ link }) {
  const { updateLink } = useLinks()
  const checkboxRef = useRef(null)

  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false)
  const handleCloseFromDelete = () => setShowDeleteLinkModal(false)

  const [showUpdateLinkModal, setShowUpdateLinkModal] = useState(false)
  const handleCloseFromUpdate = () => setShowUpdateLinkModal(false)

  const handleStatus = async () => {
    const status = checkboxRef.current.checked
    const res = await updateLink({ ...link, status })
    console.log(res)
  }

  return (
    <>
      <Card>
        <Card.Body className='px-3 cardBody'>
          <div className='d-flex justify-content-between px-1 tittleContainer align-items-center'>
            <Card.Title className='d-flex'>
              <span className='px-3 pt-2 d-flex align-items-center'>{link.name}</span>
              <Button onClick={() => setShowUpdateLinkModal(link)} className='mx-3' variant=''>
                <MdOutlineModeEditOutline />
              </Button>
            </Card.Title>
            <Form.Check
              type='switch'
              id='custom-switch'
              defaultChecked={link.status}
              onChange={handleStatus}
              ref={checkboxRef}
            />
          </div>
          <div className='d-flex justify-content-between'>
            <Link className='url-link' to={link.urlEnlace}>
              <Card.Text className='m-2'>{link.urlEnlace.length > 35 ? `${link.urlEnlace.substring(0, 35)}...` : link.urlEnlace}</Card.Text>
            </Link>
            <Button onClick={() => setShowDeleteLinkModal(link._id)} className='' variant=''>
              <FaTrashAlt />
            </Button>
          </div>
        </Card.Body>
      </Card>
      <DeleteLink show={showDeleteLinkModal} onHide={handleCloseFromDelete} linkId={showDeleteLinkModal} />
      <UpdateLink show={showUpdateLinkModal} onHide={handleCloseFromUpdate} link={link} />
    </>
  )
}
