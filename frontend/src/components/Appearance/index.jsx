import SocialIcons from '../SocialIcons/SocialIcons'
import { ButtonPrimary } from '../theme/buttons'
import ProfileCard from './ProfileCard'

function Appearance () {
  return <>
        <h1>Apariencia</h1>
        <ProfileCard />
        <SocialIcons />
        <ButtonPrimary>Guardar</ButtonPrimary>
    </>
}

export default Appearance
