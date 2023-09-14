import { Button, Form, FormGroup, FormLabel, FormText, Image } from "react-bootstrap";
import useUser from '../../hooks/useUser';
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function FormDataUser (){
  const { user, editUser } = useUser();

  const nameUserRef = useRef();

  const fileInputRef = useRef();

  const maxSizeInBytes = 500 * 1024;

  const handleEdit = async (e) =>{
    e.preventDefault()
    const name = nameUserRef.current.value;
    const photo = fileInputRef.current.files[0];
    let nuevoNombre;
    if (!photo) {
      return toast.error("Seleccione una foto");
    }
    if (photo.size > maxSizeInBytes) {
      return toast.error('El archivo es demasiado grande. Seleccione un archivo más pequeño.');
    }
    if(!name){
      return toast.error("Nuevo nombre no proporcionado");
    }if (photo && photo.type) { // Verificar que photo y photo.mimetype estén definidos
      nuevoNombre = `${user.id}_${Date.now()}.${photo.type.split('/')[1]}`;
    }  
    console.log(nuevoNombre)
    const res = await editUser({ name, photo, photoName });
    console.log(res)
  }

  const imageStyle = {
    borderRadius: '50%',
    width: "64px",
    height: "64px"
}

  return (
    <Form className='w-100 d-flex flex-column align-items-center' onSubmit={handleEdit} encType="multipart/form-data">
      <div className='w-100 text-center' >
        <h1 className='form-header mb-4' >Mi cuenta</h1>
      </div>
      <div className='w-100 text-center'>
        <h3 className='mb-4' >Actualizar nombre y foto</h3>
      </div>
      <Image
        src="http://localhost:4000/uploads/images/64fe508954b7e0fc1c490d18_1694554220408.png"
        alt={`${user.name}_photo`}
        style={imageStyle}
      />
      <FormGroup>
        <FormLabel>Foto de Perfil</FormLabel>
        <Form.Control
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
        />
        <FormText muted>
        El archivo no puede pesar más de 500 KB y debe ser en formato JPEG, JPG O PNG.
        </FormText>
        </FormGroup>
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    ref={nameUserRef}
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

  )

}