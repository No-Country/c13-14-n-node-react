import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Bio(){
  return (
    
      
      
    <InputGroup>
    <InputGroup.Text>Bio</InputGroup.Text>
    <Form.Control as="textarea" aria-label="With textarea" />
  </InputGroup>
  );
}

