import { Container } from 'react-bootstrap'
import AdminNavbar from '../components/Toolbar/index'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';

import FormDataUser from '../components/FormDataUser/index'
import FormUpdatePassword from '../components/FormUpdatePassword/index'
import FormDeleteUser from '../components/FormDeleteUser/indes'

export default function AccountPage () {

  const [tab, setTab] = useState(1);

  return(
    <section>
        <AdminNavbar setTab={setTab} />
        <Container className='min-vh-100'>
            <Toaster />
            <FormDataUser />
            <FormUpdatePassword />
            <FormDeleteUser />
        </Container>
    </section>
)
  }
