import { Button, Form, FormGroup, FormLabel, FormText, Image } from "react-bootstrap";
import useUser from '../../hooks/useUser';
import { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { API_URL_PHOTOS } from "../../config/constants";

export default function FormDataUser (){
  const { user, editUser } = useUser();

  const nameUserRef = useRef();

  const fileInputRef = useRef();

  const maxSizeInBytes = 500 * 1024;

  const handleEdit = async (e) =>{
    e.preventDefault()
    let name = nameUserRef.current.value;
    let photo = fileInputRef.current.files[0];
    let nuevoNombre;
    if (photo) {
      if (photo.size > maxSizeInBytes) {
        return toast.error('El archivo es demasiado grande. Seleccione un archivo más pequeño.');
      }if (photo.type) { // Verificar que photo y photo.mimetype estén definidos
        nuevoNombre = `${user.id}_${Date.now()}.${photo.type.split('/')[1]}`;
      }
    }
    let oldPhoto = user.photo;
    photo = photo?photo:user.photo;
    name = name?name:user.name;
    const res = await editUser({ name, photo, nuevoNombre, oldPhoto });
    if (res) {
      if (res.payload.name !== undefined && res.payload.photo !== undefined) {
        if (res.payload.photo !== oldPhoto && res.payload.name === user.name) {
          toast.success("Foto actualizada con éxito");
        } else if (res.payload.name !== user.name && res.payload.photo === user.photo) {
          toast.success("Nombre actualizado con éxito");
        } else if (res.payload.name !== user.name && res.payload.photo !== oldPhoto) {
          toast.success("Nombre y foto actualizados con éxito");
        }
      } else if (res.payload.name !== undefined) {
        toast.success("Nombre actualizado con éxito");
      } else if (res.payload.photo !== undefined) {
        toast.success("Foto actualizada con éxito");
      }
    }
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
        src={`${API_URL_PHOTOS}/${user.photo}`}
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