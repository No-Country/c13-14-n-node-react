import { Button, Container } from 'react-bootstrap'
export default function SearchForm() {
    return (
        <div>
            <Container className="">
                <form className='d-flex gap-3'>
                    <input type='text' placeholder="Buscar perfil..." className='form-control' />
                    <Button className=''>CREAR</Button>
                </form>
            </Container>
        </div>
    )
}