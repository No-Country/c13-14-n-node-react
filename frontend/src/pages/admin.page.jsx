import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import useLoader from '@/hooks/useLoader'

import Toolbar from '@/components/Toolbar'
import LinksList from '@/components/LinksList/LinksList'
import Previewer from '@/components/previewer/Previewer'
import ListProfiles from '@/components/UserProfiles/ListProfiles'
import { ProfileSettings } from '../components/ProfileSettings/ProfileSettings'
import Appearance from '../components/Appearance'
import Account from '../components/Account'

export default function AdminPage () {
  const [tab, setTab] = useState(1)

  const { loaderOnOff } = useLoader()

  useEffect(() => { loaderOnOff(false) }, [])

  return (
    <section className='flex-grow min-vh-100'>
        <Toolbar tab={tab} setTab={setTab}/>
        <Container className='mt-5'>
          <Row className='bg-light d-flex rounded-3 p-3'>
            <Col sm={12} lg={ tab === 5 ? 12 : 8}>
              { tab === 1 && <ListProfiles setTab={setTab} /> }
              { tab === 2 && <LinksList/> }
              { tab === 3 && <Appearance /> }
              { tab === 4 && <ProfileSettings/> }
              { tab === 5 && <Account/> }
            </Col>
            { tab !== 5 &&
              <Col sm={12} lg={4} className='d-flex justify-content-center'>
                <Previewer/>
              </Col>
            }
        </Row>
      </Container>
    </section>
  )
}
