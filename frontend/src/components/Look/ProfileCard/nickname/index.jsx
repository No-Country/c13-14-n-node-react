import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function Nickname(){
    return <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    <Form.Control
      placeholder="Profilename"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
}