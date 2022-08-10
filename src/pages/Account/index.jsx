import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    ListGroup,
    Modal,
    Nav,
    OverlayTrigger,
    Tooltip,
    Row,
    Tab,
    Tabs
} from "react-bootstrap"
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useRouteMatch } from "react-router-dom"
import { getAddresses } from "../../app/features/Address/actions";
import { AddAddress, Address } from "../../components";
import Home from "../Home";
import Login from "../Login";
import { FaTrash } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";


import './account.css';


const Account = () => {
    // const match = useRouteMatch();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user);
    const address = useSelector(state => state.address.data);


    useEffect(() => {
        dispatch(getAddresses())

    }, [dispatch])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    return (

        <Container className="py-4">
            <Row className="justify-content-center">
                <Tabs justify variant="tabs" defaultActiviteKey="profile" className="mb-1 p-0">
                    <Tab eventKey="profile" title="Profile">

                        <DataTable
                            columns={[
                                { selector: row => row.label },
                                { selector: row => row.value },
                            ]}
                            data={[
                                { label: 'Nama', value: auth.user.full_name },
                                { label: 'Email', value: auth.user.email },
                            ]}
                        />

                    </Tab>
                    <Tab eventKey="address" title="Address">
                        <div>
                            <Link to="#">
                                <Button onClick={handleShow} variant="success" size="sm">
                                    Tambah Alamat
                                </Button>
                            </Link>
                            <DataTable
                                columns={[
                                    {
                                        name: 'Name',
                                        selector: row => row.nama
                                    },
                                    {
                                        name: 'Detail',
                                        cell: row => `${row.detail}, ${row.kelurahan}, ${row.kecamatan}, ${row.kabupaten}, ${row.provinsi} `
                                    },
                                    {
                                        name: 'Action',
                                        button: true,
                                        ignoreRowClick: true,
                                        allowOverflow: true,
                                        cell: () => (
                                            <div className="justify-content-between">

                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                                    <Button onClick={handleShow} variant='warning' className='me-2'>
                                                        <span><GrEdit /></span>
                                                    </Button>
                                                </OverlayTrigger>

                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Hapus</Tooltip>}>
                                                    <Button onClick={''} variant='danger'>
                                                        <span><FaTrash /></span>
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        )
                                    }
                                ]}
                                data={address}
                            />
                        </div>
                    </Tab>
                </Tabs>
            </Row>

            <Modal show={show} fullscreen={'xl-down'} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddAddress />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container >
    )
}

export default Account;