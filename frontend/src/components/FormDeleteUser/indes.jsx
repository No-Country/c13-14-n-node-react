import { Button, Form, FormText } from "react-bootstrap";


export default function formDeleteUser(){



    return (
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
    )
}