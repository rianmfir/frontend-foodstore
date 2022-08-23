import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAddresses } from '../../app/features/Address/actions';

const Address = () => {
    const dispatch = useDispatch();
    // const [address, setAddress] = useState([]);

    const { address } = useSelector(state => state.address);

    // console.log("Address : ", data)


    useEffect(() => {
        dispatch(getAddresses())
    }, []);

    return (
        <div>
            <Link to="/account/add-address">
                <Button variant="danger" size="sm">
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
                        cell: row => `${row.provinsi}, ${row.kabupaten}, ${row.kecamatan}, ${row.kelurahan}, ${row.detail}`
                    }
                ]}
                data={address}
            />
        </div>
    )
}

export default Address;