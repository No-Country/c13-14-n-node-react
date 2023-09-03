import { useSelector } from "react-redux"
import ListGroup from 'react-bootstrap/ListGroup'

const ListProfiles = () => {
    const { profile } = useSelector(state => state.profile)

    const deleteProfile = (id) => {
        console.log(id)
    }

    const updateProfile = (id) => {
        console.log(id)
    }

    return (
        <ListGroup className="mt-5 container">
            {
                profile.map(item => (
                    <ListGroup.Item key={item._id} className="shadow-sm d-flex align-items-center justify-content-between my-2 p-1 rounded-3">
                        <section className="d-flex align-items-center">
                            <div
                                style={{
                                    backgroundImage: new URL(item.image === 'default.jpg' ? `https://api.lorem.space/image/face?w=450` : `${item.image}`).toString(),
                                }}
                                className="avatar"
                            >
                            </div>
                            <p className="mx-3">{item.nameSpace}</p>
                        </section>
                        <section className="icon-list d-flex align-items-center justify-content-between m-2">
                            <i className="bi bi-trash3-fill text-danger" onClick={() => deleteProfile(item._id)}></i>
                            <i className="bi bi-pencil-square text-primary" onClick={() => updateProfile(item._id)}></i>
                        </section>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ListProfiles