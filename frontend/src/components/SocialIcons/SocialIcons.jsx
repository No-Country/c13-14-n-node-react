import { CiInstagram } from 'react-icons/ci'
import { FiTwitter } from 'react-icons/fi'
import { PiTiktokLogoLight } from 'react-icons/pi'
import { BsFacebook } from 'react-icons/bs'

import { SOCIAL_ICONS_URLS } from '../../config/constants'

export default function SocialIcons ({ social }) {
  const { instagram, facebook, twitter, tiktok } = social
  return (
    <div className='d-flex gap-3 mt-2 mb-3 align-items-center'>
      { instagram &&
        <a href={`${SOCIAL_ICONS_URLS.instagram}${instagram}`} target='_blank' className='text-decoration-none text-white' rel="noreferrer">
          <CiInstagram size={42}/>
        </a>
      }
      { facebook &&
        <a href={`${SOCIAL_ICONS_URLS.facebook}${facebook}`} target='_blank' className='text-decoration-none text-white' rel="noreferrer">
          <BsFacebook size={32}/>
        </a>
      }
      { twitter &&
        <a href={`${SOCIAL_ICONS_URLS.twitter}${twitter}`} target='_blank' className='text-decoration-none text-white' rel="noreferrer">
          <FiTwitter size={32}/>
        </a>
      }
      { tiktok &&
        <a href={`${SOCIAL_ICONS_URLS.tiktok}${tiktok}`} target='_blank' className='text-decoration-none text-white' rel="noreferrer">
          <PiTiktokLogoLight size={32}/>
        </a>
      }
  </div>
  )
}
