import { useEffect, useState } from "react";
import {
    Button,
    Card,
    OverlayTrigger,
    Tooltip,
    Row,
    Tab,
    Tabs,
    Col
} from "react-bootstrap"
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FormAddress } from "../User";
import { deleteAddress, getAddresses, setFormDefault } from "../../app/features/Address/actions";
import Swal from 'sweetalert2';
import { Button as CustomButton } from "../atoms";
import { setTitleDashboard } from "../../app/features/Auth/actions";



const Account = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user);
    const { address, data } = useSelector(state => state.address);

    const [show, setShow] = useState(false);
    const [updateData, setUpdateData] = useState();

    const toggleShow = () => {
        setShow(false);
        dispatch(setFormDefault());
        setUpdateData("");
        console.log("Toggle");
    }

    const handleShow = () => {
        setShow(true);
        setUpdateData("");
        console.log("Show");
    }

    const handleEdit = (e) => {
        handleShow();
        setUpdateData(e)
    }

    const handleDelete = (id) => {

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

    useEffect(() => {
        dispatch(setTitleDashboard('Account'));
    }, [dispatch])

    return (
        <>
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
                                    <Col md={3} className="ms-auto my-3">
                                        {/* <CustomButton onClick={handleShowAdd} title={'Tambah Alamat'} /> */}
                                        <CustomButton onClick={handleShow} title={'Tambah Alamat'} />
                                    </Col>
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
                                                            <Button onClick={() => handleEdit(row)} variant='warning' className='me-2'>
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

            <>
                <FormAddress show={show} toggleShow={toggleShow} updateData={updateData} />

                {/* {
                formAddress === "add"
                    ?
                    // <AddAddress show={show} toggleShow={toggleShow} />
                    <FormAddress show={show} toggleShow={toggleShow} />
                    :
                    <UpdateAddress show={show} toggleShow={toggleShow} dataAddress={dataAddress} />
            } */}
            </>
        </>
        // </Container >
    )
}

export default Account;