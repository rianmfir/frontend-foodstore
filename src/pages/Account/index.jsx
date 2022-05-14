import { Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { Link, Route, Routes, useRouteMatch } from "react-router-dom"
import Home from "../Home";
import Login from "../Login";


const Account = () => {
    // const match = useRouteMatch();
    return (
        <div>
            <h1>Hello World</h1>
        </div>
        //     <Container className="mt-5 p-5">
        //            <Card>
        //   <Card.Body>
        //     <DataTable 
        //       columns={[
        //         {selector: row => row.label},
        //         {selector: row => row.value},
        //       ]}
        //       data={[
        //         {label: 'Nama', value: auth.user.full_name},
        //         {label: 'Email', value: auth.user.email},
        //       ]}
        //     />
        //   </Card.Body>
        // </Card>
        //     </Container>
    )
}

export default Account;