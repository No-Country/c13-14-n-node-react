import { useSelector } from "react-redux"
import ListGroup from 'react-bootstrap/ListGroup'

const ListProfiles = () => {
    const { profile } = useSelector(state => state.profile)

    return (
        <ListGroup className="mt-5 container">
            {
                profile.map(item => (
                    <ListGroup.Item key={item._id} className="shadow-sm d-flex align-items-center justify-content-between my-2 p-1 rounded-3">
                        <section className="d-flex align-items-center">
                            <div
                                style={{
                                    backgroundImage: new URL(`https://api.lorem.space/image/face?w=450`).toString(),
                                }}
                                className="avatar"
                            >
                            </div>
                            <p className="mx-3">xxxx xxxxx</p>
                        </section>
                        <section className="icon-list d-flex align-items-center justify-content-between m-2">
                            <i className="bi bi-trash3-fill text-danger"></i>
                            <i className="bi bi-pencil-square text-primary"></i>
                        </section>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ListProfiles