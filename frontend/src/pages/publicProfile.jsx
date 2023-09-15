import { Col, Container, Image, Row } from 'react-bootstrap'
import useProfile from '../hooks/useProfile'
import { useEffect } from 'react'

import defaultImage from '../assets/user.jpg'

import Loader from '../components/Loader'
import SocialIcons from '../components/SocialIcons/SocialIcons'
import { ButtonLink } from '../components/theme/buttons'

export default function PublicProfile ({ nameSpace }) {
  const { profile, loadPublicProfile } = useProfile()

  // Cargo el profile
  useEffect(() => {
    console.log('ENTRO ACA')
    loadPublicProfile(nameSpace)
      .then(res => {
        if (!res.solved) window.location.href = 'http://localhost:5173'
      })
  }, [])

  return (
    <main>
      {!profile && <Loader/>}
      <Container fluid className='public-backgraund min-vh-100'>
        <Row>
          <Col className='d-flex flex-column gap-2 mx-2 align-items-center mt-5'>
              <Image src={defaultImage} roundedCircle width={90} className='mb-1' />
              <h5 className='text-black'>
                @{profile.nameSpace}
              </h5>
              <p>{profile.body}</p>
              <SocialIcons/>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex flex-column gap-2 mx-2 align-items-center mt-2'>
          { profile.links.map(link => link.status &&
          (
            <ButtonLink key={link._id} width='500px'>
              {link.name}
            </ButtonLink>
          )) }
          </Col>
        </Row>
      </Container>
    </main>
  )
}
