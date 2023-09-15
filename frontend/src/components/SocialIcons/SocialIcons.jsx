import { CiInstagram, CiYoutube } from 'react-icons/ci'
import { FiTwitch, FiTwitter } from 'react-icons/fi'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { PiTiktokLogoLight } from 'react-icons/pi'

import { SOCIAL_ICONS_URLS } from '../../config/constants'

export default function SocialIcons ({ instagram, twitter, linkedin, youtube, twitch, tiktok }) {
  return (
    <div className='d-flex gap-3 mt-2 mb-3'>
      { instagram &&
        <a href={`${SOCIAL_ICONS_URLS.instagram}${instagram}`} target='_blank' className='text-decoration-none text-white' rel="noreferrer">
          <CiInstagram size={24}/>
        </a>
      }
      { twitter &&
        <a href={`${SOCIAL_ICONS_URLS.twitter}${twitter}`} className='text-decoration-none text-white'>
          <FiTwitter size={24}/>
        </a>
      }
      { linkedin &&
        <a href={`${SOCIAL_ICONS_URLS.twitter}${twitter}`} className='text-decoration-none text-white'>
          <AiOutlineLinkedin size={24}/>
        </a>
      }
      { youtube &&
        <a href={`${SOCIAL_ICONS_URLS.youtube}${youtube}`} className='text-decoration-none text-white'>
          <CiYoutube size={24}/>
        </a>
      }
      { twitch &&
        <a href={`${SOCIAL_ICONS_URLS.twitch}${twitch}`} className='text-decoration-none text-white'>
          <FiTwitch size={24}/>
        </a>
      }
      { tiktok &&
        <a href={`${SOCIAL_ICONS_URLS.tiktok}${tiktok}`} className='text-decoration-none text-white'>
          <FiTwitch size={24}/>
        </a>
      }
  </div>
  )
}
