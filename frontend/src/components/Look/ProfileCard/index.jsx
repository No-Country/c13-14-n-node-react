import AddImgModal from "./add-img-modal"
import AddSocialIcons from "./add_social-icon"
import Bio from "./bio"
import Nickname from "./nickname"

export default function ProfileCard() {
    return <div class="container-fluid" style={{ display: "flex",  flexDirection: "column", margin: "0 0", padding: "15px 15px"}}>
        <div class="container-fluid" style={{width: "100px", height: "100px", display: "flex", justifyContent: "center", borderRadius: "50%"}}><img style={{margin: "15px 0", width: "90px", height: "90px", display: "flex", justifyContent: "center",  borderRadius: "50%"}} src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="image"></img></div>
        <AddImgModal />
        <br />
        <Nickname />
        <br />
        <Bio />
        <br />
        <AddSocialIcons />

    </div>
}
