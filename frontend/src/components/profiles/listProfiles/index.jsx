import { useState } from "react"

const ListProfiles = () => {
    const [profiles, setProfiles] = useState([])
    return (
        <div>
            <ul>
                {
                    profiles.map(profile => (
                        <li key={profile._id}>{profile.nameSpace}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ListProfiles