import { Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { Link, Route, Routes } from "react-router-dom"


const Account = () => {
    return (
        <Container className="mt-5 p-5">
            <Card>
                <Card.Header>
                    Account
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={3}>
                            <ListGroup>
                                <Link to="/account" exact>
                                    <ListGroup.Item action>
                                        Profil
                                    </ListGroup.Item>
                                </Link>
                                <Link to="/account/orders" exact>
                                    <ListGroup.Item action>
                                        Pemesanan
                                    </ListGroup.Item>
                                </Link>
                                <Link to="/account/address" exact>
                                    <ListGroup.Item action>
                                        Alamat
                                    </ListGroup.Item>
                                </Link>
                                <Link to="/account/logout" exact>
                                    <ListGroup.Item action>
                                        Logout
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </Col>
                        <Col md={9}>
                            <Routes>
                                {/* <Route path={`${match.url}`} component={Profile} exact />
                                <Route path={`${match.url}/logout`} component={Logout} exact />
                                <Route path={`${match.url}/orders`} component={Order} exact />
                                <Route path={`${match.url}/address`} component={Address} />
                                <Route path={`${match.url}/add-address`} component={AddAddress} /> */}
                            </Routes>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Account;