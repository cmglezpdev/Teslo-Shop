import { useState, useEffect } from 'react';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import useSWR from 'swr';
import { AdminLayout } from '../../layouts';
import { IUser } from '../../interfaces';
import tesloApi from '../../api/tesloApi';

const UsersPage = () => {
    
    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if( data ) setUsers(data);
    }, [data])


    if( !data && !error )
        return <div>Loading...</div>

    const onRoleUpdate = async ( userId:string, role:string ) => {
        const previosUsers = users.map(user => ({ ...user }))
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? role : user.role
        }))
        setUsers(updatedUsers as IUser[]);

        try {
            await tesloApi.put('admin/users', {userId, role});
        } catch (error) {
            console.log(error)
            alert('Error updating user role');
            setUsers(previosUsers as IUser[]);
        }
    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Full Name', width: 300 },
        { 
            field: 'role', 
            headerName: 'Role', 
            width: 300,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <Select
                        value={ row.role }
                        label="Role"
                        onChange={ e => onRoleUpdate(row.id, e.target.value) }
                        sx={{ width: 300 }}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="client">Client</MenuItem>
                        <MenuItem value="super-user">Super User</MenuItem>
                        <MenuItem value="SEO">SEO</MenuItem>
                    </Select>
                )
            }
        },
    ];
    
    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))
    
    return (
        <AdminLayout 
            title="Users"
            subtitle='User Maintenance'
            icon={ <PeopleOutline /> }
        >
            <Grid container sx={{mt: 2}} className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>    
    )
}

export default UsersPage;