import React from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

const Profile = () => {

    const auth = useSelector(state => state.auth.user);

    return (
        <>
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
        </>
    )
}

export default Profile;