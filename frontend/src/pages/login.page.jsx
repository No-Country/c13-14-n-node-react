import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useLanguage from "../hooks/useLanguage";
import { loginService } from "../services/auth.service";
import { emailValidation } from "../validations/register.validator";

import Logo from "../components/logo";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import { APP_URL_ADMIN } from "../config/constants";

export default function RegisterPage() {
  const navigate = useNavigate;
  const { dictionaryWord } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('this stuff')
    loginService(data)
      .then((res) => {
        // Si la respuesta es valida ir al formulario de validacion
        res && navigate(APP_URL_ADMIN);
      })
      .catch((error) => {
        //! Tratar el error
        console.log(error);
      });
  };

  const messageError = (name) => {
    console.log('error')
    const filedErrors = errors[name];
    if (!filedErrors) return null;
    let error = filedErrors.type;
    return dictionaryWord("loginPage." + error);
  };

  return (
    <section className='max-w-sm mx-auto'>
      <Container>
        <Row>
          <Col className='d-flex flex-column justify-content-center align-items-center w-350 m-auto'>
            <Logo height='37px' width='160px' fill='black' />
          </Col>
          <Col>
            <div>
              <h2 className='text-center text-3xl font-bold my-10'>
                {dictionaryWord("loginPage.title")}
              </h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    validations={emailValidation}
                    type='email'
                    placeholder='Ingresa tu correo electrónico'
                    register={register}
                    messageError={messageError}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Ingresa tu contraseña'
                    register={register}
                    messageError={messageError}
                  />
                </Form.Group>
                <Button
                  type="sumbit"
                  className='w-full mt-2'
                  variant='primary'
                >
                  Iniciar sesión
                </Button>
              </Form>

              <p className='text-center text-3xl font-bold my-10'>
                {" "}
                <a href='/'> olvide mi contrasena</a>
              </p>
              <p className='text-center text-3xl font-bold my-10'>
                Aun no tienes cuenta? <a href='/register'>registrate aca</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
