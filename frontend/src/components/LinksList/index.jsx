import { Button, Container, Row } from 'react-bootstrap'
import React, { useState } from 'react';
import LinkItem from '../LinkItem'
import useLinks from '../../hooks/useLinks'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './index.css';
import { FiCreditCard } from "react-icons/fi";

export default function LinkList() {
  const { links, addLink } = useLinks()
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [showAddTitleModal, setShowAddTitleModal] = useState(false);

  const handleShowAddLinkModal = () => {
    setShowAddLinkModal(true)
  }
  const handleCloseAddLinkModal = () => {
    setShowAddLinkModal(false);
  };
  const handleShowAddTitleModal = () => {
    setShowAddTitleModal(true)
  }
  const handleCloseAddTitleModal = () => {
    setShowAddTitleModal(false);
  };

  const handleAddLinkFormSubmit = (data) => {
    const newLink = {
      name: data.name,
      urlEnlace: data.urlEnlace,
      order: 1,
      status: data.status
    }
    addLink(newLink)
  }
  const handleAddTitleFormSubmit = (data) => {
    const newTitle = {
      name: data.name,
    }
    addTitle(newTitle)
  }

  return (
    <>
      <Container className='d-flex gap-3 flex-column containerLinks'>
        <Row>
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
          {links.map(link =>
            <LinkItem key={link.title} link={link} />
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
