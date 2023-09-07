import { Button, Container, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import LinkItem from '../LinkItem'
import useLinks from '../../hooks/useLinks'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import './index.css'
import { FiCreditCard } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { setLinks } from '../../reducers/links.slice'
import { getLinksService } from '../../services/links.service'

export default function LinkList ({ link }) {
  const { links, addLink } = useLinks()
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [showAddTitleModal, setShowAddTitleModal] = useState(false)
  const dispatch = useDispatch()

  // Función para cargar los enlaces
  const fetchLinks = async () => {
    try {
      const links = await getLinksService()
      dispatch(setLinks(links))
    } catch (error) {
      console.error('Error al cargar los enlaces:', error)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [dispatch])

  // Manejo modal para agregar link
  const handleShowAddLinkModal = () => {
    setShowAddLinkModal(true)
  }
  const handleCloseAddLinkModal = () => {
    setShowAddLinkModal(false)
  }

  // Manejo modal para agregar titulo
  const handleShowAddTitleModal = () => {
    setShowAddTitleModal(true)
  }
  const handleCloseAddTitleModal = () => {
    setShowAddTitleModal(false)
  }

  // Agregar un link
  const handleAddLinkFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newName = formData.get('name')
    const newUrlEnlace = formData.get('urlEnlace')

    if (newName && newUrlEnlace) {
      const newLink = {
        name: newName,
        profile: '64f51237a0d2e00a28b13939',
        icon: '123456',
        urlEnlace: newUrlEnlace,
        order: links.length + 1,
        status: true
      }
      await addLink(newLink)
      await fetchLinks()
      setShowAddLinkModal(false)
      console.log(newLink)
    }
  }

  // Eliminar link
  const { deleteLink } = useLinks()
  const handleDeleteLink = async (link) => {
    try {
      await deleteLink(link._id)
      await fetchLinks()
    } catch (error) {
      console.error('Error al eliminar el enlace:', error)
    }
  }

  // Modificar el link

  // Modificar estado del link
  const { toggleLinkStatus } = useLinks()
  const handletoggleLinkStatus = async (link) => {
    try {
      const updatedLink = {
        name: link.name,
        profile: link.profile,
        icon: link.icon,
        urlEnlace: link.urlEnlace,
        order: link.order,
        status: !link.status
      }
      await toggleLinkStatus(link._id, updatedLink)
      await fetchLinks()
    } catch (error) {
      console.error('Error al cambiar el estado', error)
    }
  }

  // Agregar un titulo
  const handleAddTitleFormSubmit = (data) => {
    // const newTitle = {
    //   name: data.name
    // }
    // addTitle(newTitle)
  }

  return (
    <>
      <Container className='d-flex row gap-3 w-100'>
        <Row className='col-12'>
          <Button
            className='rounded-pill addLinkButton'
            onClick={handleShowAddLinkModal}
            variant=''
          >
            Agregar link +
          </Button>
        </Row>
        <Row>
          <Button
            className='rounded-pill addTittleButton col-4'
            onClick={handleShowAddTitleModal}
            variant=''
          >
            <FiCreditCard /> Agregar titulo
          </Button>
        </Row>
        <Row className='d-flex gap-3'>
          {links.map((link, index) =>
            <LinkItem key={index} link={link} handleDeleteLink={handleDeleteLink} handletoggleLinkStatus={handletoggleLinkStatus}/>
          )}
        </Row>
      </Container>

      {/* Modal para agregar Link */}
      <Modal show={showAddLinkModal} onHide={handleCloseAddLinkModal}>
        <Modal.Header className='modalHeader' closeButton>
          <Modal.Title className="modalTitle">
            <strong>Nuevo Link</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleAddLinkFormSubmit}>
            <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
              />
            </Form.Group>
            <Form.Group className="formFields m-2 col-10 col-md-5" controlId="formBasicUrlEnlace">
              <Form.Label>URL:</Form.Label>
              <Form.Control
                type="text"
                name="urlEnlace"
              />
            </Form.Group>
            <Modal.Footer className="mt-3 col-8">
              <div className='col-12'>
                <Button className='buttonsFormAddPatient w-100' variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal para agregar un titulo */}
      <Modal show={showAddTitleModal} onHide={handleCloseAddTitleModal}>
        <Modal.Header className='modalHeader' closeButton>
          <Modal.Title className="modalTitle">
            <strong>Nuevo Titulo</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleAddTitleFormSubmit}>
            <Form.Group className="formFields w-75" controlId="formBasicTitle">
              <Form.Label>Titulo:</Form.Label>
              <Form.Control
                type="text"
                name="title"
              />
            </Form.Group>
            <Modal.Footer className="mt-3 col-8">
              <div className='col-12'>
                <Button className='buttonsFormAddPatient w-100' variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
