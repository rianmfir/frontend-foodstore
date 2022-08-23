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

import { FaEdit, FaTrash } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";


import './account.scss';
import { AddAddress, UpdateAddress } from "../../components/User";
import { clearItem, deleteAddress, getAddresses } from "../../app/features/Address/actions";
import Swal from 'sweetalert2';



const Account = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user);
    const { address, data, loading } = useSelector(state => state.address);

    const [formAddress, setFormAddress] = useState("");
    const [dataAddress, setDataAddress] = useState("");

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(false);
        dispatch(clearItem());
    }

    const handleShowAdd = () => {
        setFormAddress("add");
        setShow(true);
    }

    const handleShowUpdate = (data) => {
        setFormAddress("update")
        setShow(true);
        setDataAddress(data);
    }

    const handleDelete = (id) => {

        // Handle If Error Belum ??????

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
                dispatch(deleteAddress(id));
            }
        })
    };

    useEffect(() => {
        dispatch(getAddresses())

    }, [dispatch, data])



    return (
        // <Container className="py-4">
        <>
            <h3 className="color-primary fw-bold mb-5">Account</h3>
            <Card>
                <Card.Body>
                    <Row className="justify-content-center">
                        <Tabs justify variant="tabs" defaultActiveKey="profile" className="mb-1 p-0">
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
                                        <Button onClick={handleShowAdd} variant="success" size="sm">
                                            Tambah Alamat
                                        </Button>
                                    </Link>
                                    <DataTable
                                        columns={[
                                            {
                                                name: 'Nama',
                                                selector: row => row.nama
                                            },
                                            {
                                                name: 'Detail',
                                                cell: row => `${row.detail}, ${row.kelurahan}, ${row.kecamatan}, ${row.kabupaten}, ${row.provinsi} `
                                            },
                                            {
                                                name: 'Aksi',
                                                button: true,
                                                ignoreRowClick: true,
                                                allowOverflow: true,
                                                cell: row => (
                                                    <div className="justify-content-between">

                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                                            <Button onClick={() => handleShowUpdate(row)} variant='warning' className='me-2'>
                                                                <span><FaEdit color="white" size={22} /></span>
                                                            </Button>
                                                        </OverlayTrigger>

                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Hapus</Tooltip>}>
                                                            <Button onClick={() => handleDelete(row._id)} variant='danger'>
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
                </Card.Body>
            </Card>

            <>{
                formAddress === "add"
                    ?
                    <AddAddress show={show} toggleShow={toggleShow} />
                    :
                    <UpdateAddress show={show} toggleShow={toggleShow} dataAddress={dataAddress} />
            }
            </>
        </>
        // </Container >
    )
}

export default Account;