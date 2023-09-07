import { useDispatch, useSelector } from "react-redux"
import ListGroup from 'react-bootstrap/ListGroup'

const ListProfiles = () => {
    const dispatch = useDispatch()
    const { profiles } = useSelector(state => state.profile)


    return (
        <ListGroup className="mt-5 container">
            {
                profiles.map(item => (
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
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ListProfiles