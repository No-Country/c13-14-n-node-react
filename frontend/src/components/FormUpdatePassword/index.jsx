import { useRef } from "react";
import toast from "react-hot-toast";
import useUser from '../../hooks/useUser';
import { Form, Button } from 'react-bootstrap'


export default function FormUpdatePassword (){

    const newPasswordRef = useRef();

    const newPasswordConfirmationRef = useRef();

    const { user, editPassword } = useUser();

    const handleChangePassword = async (e) => {
        e.preventDefault()
        let newPassword = newPasswordRef.current.value;
        let confirmationNewPassword = newPasswordConfirmationRef.current.value;
        if(!newPassword || !confirmationNewPassword){
            return toast.error("Escriba una contraseña");
        }else{
            if(newPassword !==  confirmationNewPassword){
                return toast.error("Las contraseñas no coinciden");
            }else{
                try{
                    const res = await editPassword(confirmationNewPassword);
                    toast.success("Contraseña Cambiada");
                }catch (error) {
                    toast.error("Ocurrió un error al cambiar la contraseña")
                }
            }
        }
    }

    return(
        <Form className='w-100 d-flex flex-column align-items-center' onSubmit={handleChangePassword}>
            <hr />
            <div className='w-100 text-center'>
                <h3 className='mb-4' >Actualizar Contraseña</h3>
            </div>
            <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>Nueva Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        ref={newPasswordRef}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPasswordConfirmation">
                <Form.Label>Confirma Nueva Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        ref={newPasswordConfirmationRef}
                    />
            </Form.Group>
            <Button
                type='submit'
                className='form-btn'
                variant="primary"
            >Actualizar Contraseña</Button>
        </Form>
    )
}