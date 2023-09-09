import { Container, Form, FormGroup, FormLabel, FormText, Image, Button } from 'react-bootstrap'
import AdminNavbar from '../components/navbar/index'
import { useState, useRef } from 'react'
import useSession from '../hooks/useSession';
import toast, { Toaster } from 'react-hot-toast';

export default function AccountPage () {
    const [tab, setTab] = useState(1);

    const { session, changePassword } = useSession();

    const newPasswordRef = useRef();

    const newPasswordConfirmationRef = useRef();

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if(!newPasswordRef.current.value || !newPasswordConfirmationRef.current.value){
            return toast.error("Escriba una contraseña");
        }else{
            if(newPasswordRef.current.value !==  newPasswordConfirmationRef.current.value){
                return toast.error("Las contraseñas no coinciden");
            }else{
                const res = await changePassword(newPasswordConfirmationRef.current.value, session.name, session._id);
                console.log("Hola Mundo")
            }
        }

        //agregar validaciones
    }

    const imageStyle = {
        borderRadius: '50%',
        width: "64",
        height: "64"
    }

    return(
        <section>
            <AdminNavbar setTab={setTab} />
            <Container className='min-vh-100'>
                <Toaster />
                <Form className='w-100 d-flex flex-column align-items-center'>
                    <div className='w-100 text-center' >
                        <h1 className='form-header mb-4' >Mi cuenta</h1>
                    </div>
                    <div className='w-100 text-center'>
                        <h3 className='mb-4' >Actualizar nombre y foto</h3>
                    </div>
                    <Image
                        src={session.photo}
                        alt={`${session.name}_photo`}
                        style={imageStyle}
                    />
                    <FormGroup>
                        <FormLabel>Foto de Perfil</FormLabel>
                        <Form.Control
                        type="file"
                        name="file"
                        accept="image/jpeg, image/jpg"
                        />
                        <FormText muted>
                        El archivo no puede pesar más de 6 MB y debe ser en formato JPEG.
                        </FormText>
                    </FormGroup>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                required
                            />
                    </Form.Group>
                    <Button
                        type='submit'
                        className='form-btn'
                        variant="primary"
                    >
                        Actualizar Datos
                    </Button>
                </Form>
                <Form className='w-100 d-flex flex-column align-items-center' onSubmit={handleChangePassword}>
                    <hr />
                    <div className='w-100 text-center'>
                        <h3 className='mb-4' >Actualizar Contraseña</h3>
                    </div>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Nueva Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={newPasswordRef}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Confirma Nueva Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={newPasswordConfirmationRef}
                            />
                    </Form.Group>
                    <Button
                        type='submit'
                        className='form-btn'
                        variant="primary"
                    >Actualizar Contraseña</Button>
                </Form>
                <Form className='w-100 d-flex flex-column align-items-center'>
                    <hr />
                    <div className='w-100 text-center'>
                        <h3 className='mb-4' >Eliminar Cuenta</h3>
                    </div>
                    <Button
                        type='submit'
                        className='form-btn'
                        variant="danger"
                    >Eliminar Cuenta</Button>
                    <FormText muted>
                        Por favor, ten en cuenta que al eliminar tu cuenta de forma permanente, perderás acceso a todos tus datos y configuraciones. Esto incluye tus registros, configuraciones personalizadas y cualquier información asociada con tu cuenta. No será posible recuperar estos datos una vez que la cuenta haya sido eliminada. Si estás seguro de continuar, procede con la eliminación de tu cuenta.
                    </FormText>
                </Form>
            </Container>
        </section>
    )
}