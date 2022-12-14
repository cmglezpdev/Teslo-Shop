import { Chip, Grid } from '@mui/material';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AdminLayout } from '../../layouts/AdminLayout';
import useSWR from 'swr';
import { IOrder } from '../../interfaces/order';
import { IUser } from '../../interfaces';

const columns:GridColDef[] = [
    { field: 'id', headerName: 'Order Id', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Full Name', width: 300 },
    { field: 'total', headerName: 'Total Amount', width: 100 },
    {
        field: 'isPaid',
        headerName: 'Paid',
        renderCell: ({row}:GridRenderCellParams) => {
            return row.isPaid
                ? ( <Chip variant='outlined' label='Paid' color='success' /> )
                : ( <Chip variant='outlined' label='Pending' color='error' /> )
        }
    },
    { field: 'noProducts', headerName: 'Products In Stock', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'See Order',
        renderCell: ({row}:GridRenderCellParams) => {
            return (
                <a href={`/admin/order/${row.id}`} target='_blank' rel='noreferrer'>See Order</a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
]


const OrdersPage = () => {
    
    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if( !data && !error ) {
        return <h1>Loading...</h1>
    }

    const rows = data!.map(order => ({
        id: order._id!,
        email: (order.user as IUser)!.email,
        name: (order.user as IUser).name,
        total: order.summary.totalCost,
        isPaid: order.isPaid,
        noProducts: order.summary.numberOfProducts,
        createdAt: order.createdAt,

    }))
    
    return (
        <AdminLayout
            title='Orders'
            subtitle='Manage the orders'
            icon={ <ConfirmationNumberOutlined /> }
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

export default OrdersPage;