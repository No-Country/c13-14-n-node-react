import useLanguage from '../hooks/useLanguage'

export default function LandinPage () {
  const { dictionaryWord } = useLanguage()
  return (
    <section className='flex-grow'>
        <h1>{dictionaryWord('landingPage.welcome')}</h1>
    </section>
  )
}
