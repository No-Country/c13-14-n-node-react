import { ButtonSecondary } from '../theme/buttons'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { Col, Row } from 'react-bootstrap'
import './profilecard.css'
import { useState } from 'react'

function ProfileCard () {
  const [selectedFile, setSelectFile] = useState(null)
  const handleChange = (event) => {
    const file = event.target.files[0]
    setSelectFile(file)
  }
  return <>
        <Card className='p-4'>
            <Row>
                {/* <Col style={{ display: 'flex', flexDirection: 'column' }}> */}
                <Col className='d-flex flex-column align-items-center'>
                    {selectedFile && <Image height={105} width={105} src={URL.createObjectURL(selectedFile)} roundedCircle /> }
                        <div className='d-flex gap-2 flex-column w-100 mt-4'>
                        <div className="custom_file_input">
                            <input type="file" id="fileInput" accept="image/png, image/jpeg" onChange={handleChange} />
                            <label htmlFor="fileInput">Cargar archivo</label>
                        </div>
                        <ButtonSecondary width="100%">Eliminar</ButtonSecondary>
                        </div>
                </Col>
                <Col>
                    <div className='border p-4 rounded-3'>
                    <Form.Label htmlFor="basic-url">Profile</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                        placeholder="ProfileName"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Label htmlFor="basic-url">Bio</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2" label="Bio">
                            <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }}/>
                    </FloatingLabel>
                    </div>
                </Col>
            </Row>
        </Card>
      </>
}

export default ProfileCard
