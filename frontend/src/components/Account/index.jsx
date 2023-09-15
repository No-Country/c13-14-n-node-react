import { Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'

import FormDataUser from '../FormDataUser/index'
import FormUpdatePassword from '../FormUpdatePassword/index'
import FormDeleteUser from '../FormDeleteUser/indes'

export default function Account () {
  return (
    <section>
        <Container className='min-vh-100'>
            <Toaster />
            <FormDataUser />
            <FormUpdatePassword />
            <FormDeleteUser />
        </Container>
    </section>
  )
}
