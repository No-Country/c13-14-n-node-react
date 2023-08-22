import { useNavigate, useRouteError } from 'react-router-dom'
import OutlineButton from '../components/buttons/outline.button'

// import styles from './error.module.css'
import useLanguage from '../hooks/useLanguage'
import { useRef } from 'react'

export default function ErrorPage () {
  const { dictionaryWord } = useLanguage()
  const error = useRouteError()
  const navigate = useNavigate()

  const defaultFocus = useRef(null)

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
      <h1 className='text-9xl'>{error.status}</h1>
      <h4 className='text-5xl mb-4'>{error.statusText}</h4>
      <OutlineButton
        onClick={() => navigate('/')}
        ref={defaultFocus}
        label={dictionaryWord('errorPage.button')}
        />
      </div>
    </div>
  )
}
