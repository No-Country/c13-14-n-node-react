import style from './style.module.css'

import { Card, Form, InputGroup, Modal } from 'react-bootstrap'

import { CiInstagram } from 'react-icons/ci'
import { FiTwitter } from 'react-icons/fi'
import { PiTiktokLogoLight } from 'react-icons/pi'
import { GrEdit } from 'react-icons/gr'
import { BsFacebook } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'

import useProfile from '../../hooks/useProfile'
import { useState } from 'react'
import { ButtonPrimary } from '../theme/buttons'
import { SOCIAL_ICONS_URLS } from '../../config/constants'
import { textCapitalize } from '../../libs/text'

export default function SocialList () {
  const { profile: { social }, updateSocialIcon } = useProfile()
  const [show, setShow] = useState(false)
  const [socialSelected, setSocialSelected] = useState('')
  const [socialValue, setSocialValue] = useState('')
  const [link, setLink] = useState('')

  const handleEdit = (socialName) => {
    console.log(SOCIAL_ICONS_URLS[socialName])
    setSocialSelected(socialName)
    setLink(SOCIAL_ICONS_URLS[socialName])
    setSocialValue(social[socialName])
    setShow(true)
  }
  const handleClose = () => setShow(false)

  const handleUpdatesocialValue = () => {
    setShow(false)
    updateSocialIcon({ socialName: socialSelected, value: socialValue })
  }

  return (
    <section className='mt-4'>
      <h5>Agrega tus redes sociales</h5>
      <Card className='d-flex gap-3 py-3 col-xl-6 px-4'>
          <div className='d-flex align-items-center justify-content-between  mx-4 gap-2 mx-2'>
            <div className='d-flex align-items-center gap-3'>
              <CiInstagram size={36}/>
              <h5 className={style.text}>Instagram</h5>
            </div>
            <div>
              {social.instagram &&
                <MdDeleteForever
                  onClick={() => updateSocialIcon({ socialName: 'instagram', value: '' })}
                  className={style.delete}
                />
              }
              <GrEdit onClick={() => handleEdit('instagram')} className={style.edit} />
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between  mx-4 gap-2 mx-2'>
            <div className='d-flex align-items-center gap-3'>
              <BsFacebook size={36}/>
              <h5 className={style.text}>Facebook</h5>
            </div>
            <div>
              {social.facebook &&
                <MdDeleteForever
                  onClick={() => updateSocialIcon({ socialName: 'facebook', value: '' })}
                  className={style.delete}
                />
              }
              <GrEdit onClick={() => handleEdit('facebook')} className={style.edit} />
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between  mx-4 gap-2 mx-2'>
            <div className='d-flex align-items-center gap-3'>
              <FiTwitter size={36}/>
              <h5 className={style.text}>Twitter</h5>
            </div>
            <div>
              {social.twitter &&
                <MdDeleteForever
                  onClick={() => updateSocialIcon({ socialName: 'twitter', value: '' })}
                  className={style.delete}
                  />
              }
              <GrEdit onClick={() => handleEdit('twitter')} className={style.edit} />
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between  mx-4 gap-2 mx-2'>
            <div className='d-flex align-items-center gap-3'>
              <PiTiktokLogoLight size={36}/>
              <h5 className={style.text}>Tiktok</h5>
            </div>
            <div>
              {social.tiktok &&
                <MdDeleteForever
                  onClick={() => updateSocialIcon({ socialName: 'tiktok', value: '' })}
                  className={style.delete}
                />
              }
              <GrEdit onClick={() => handleEdit('tiktok')} className={style.edit} />
            </div>
          </div>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{textCapitalize(socialSelected)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{link}</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder='perfil'
              autoFocus
              value={socialValue}
              onChange={(e) => setSocialValue(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <ButtonPrimary onClick={handleUpdatesocialValue}>
            Guardar
          </ButtonPrimary>
        </Modal.Footer>
      </Modal>
    </section>

  )
}
