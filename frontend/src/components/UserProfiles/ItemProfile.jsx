import { Image } from 'react-bootstrap'
import styles from './styles.module.css'
import imageProfile from '../../assets/user.jpg'

export default function ItemProfile ({ profile, handleSeleccion }) {
  const { id, nameSpace, rol } = profile

  return (
      <div role='button' onClick={() => handleSeleccion(id)} className={`${styles.group} d-flex my-2 py-2 align-items-center justify-content-lg-between px-3 point`}>
        <div className='d-flex align-items-center gap-4'>
          <Image roundedCircle src={imageProfile} height={60}/>
          <h4>{nameSpace}</h4>
        </div>
        <h4>{rol}</h4>
      </div>
  )
}
