import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import useProfile from '../../hooks/useProfile'

import styles from './previewer.module.css'

import defaultImage from '../../assets/user.jpg'
import { ButtonLink } from '../theme/buttons'

export default function Previewer () {
  const { profile } = useProfile()
  const { links } = profile

  return (
    <div className={styles.previewer}>
        <div className='d-flex flex-column gap-2 mx-2 align-items-center mt-5'>
          <Image src={defaultImage} roundedCircle width={90} className='mb-1' />
          <Link to={'/'} className='text-decoration-none' >
            <h5 className='text-black'>
              @{profile.nameSpace}
            </h5>
          </Link>
          <p>Acá va la bio</p>
        </div>
        <div className='d-flex flex-column gap-3 mx-2 align-items-center mt-2'>
        { links.map(link => link.status &&
          (
          <ButtonLink key={link._id} width='230px'>
            {link.name}
          </ButtonLink>
          )) }
      </div>
    </div>
  )
}
