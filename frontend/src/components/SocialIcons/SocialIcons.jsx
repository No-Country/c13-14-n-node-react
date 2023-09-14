import { Link } from 'react-router-dom'
import { CiFacebook, CiInstagram, CiYoutube } from 'react-icons/ci'
import { FiTwitch, FiTwitter } from 'react-icons/fi'

export default function SocialIcons () {
  return (
    <div className='d-flex gap-3 mt-2 mb-3'>
      <Link className='text-decoration-none text-white'>
        <CiInstagram size={24}/>
      </Link>
      <Link className='text-decoration-none text-white'>
        <FiTwitter size={24}/>
      </Link>
      <Link className='text-decoration-none text-white'>
        <CiFacebook size={24}/>
      </Link>
      <Link className='text-decoration-none text-white'>
        <CiYoutube size={24}/>
      </Link>
      <Link className='text-decoration-none text-white'>
        <FiTwitch size={24}/>
      </Link>
  </div>
  )
}
