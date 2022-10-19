import { Typography, Grid, Chip, Link } from '@mui/material';
import { ShopLayout } from '../../layouts';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import NextLink from 'next/link';

const columns:GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full Name', width: 300 },
    {
        field: 'payment',
        headerName: 'Payment',
        width: 200,
        renderCell: (params:GridRenderCellParams) => {
            return (
                params.row.payment
                    ? <Chip color='success' label='Paid Out' variant='outlined' />
                    : <Chip color='error' label='Paid Out' variant='outlined' />
            )        
        }
    },
    {
        field: 'order',
        headerName: 'See Order',
        width: 200,
        renderCell: (params:GridRenderCellParams) => {
            return (
                <NextLink href={`/order/${params.row.id}`} passHref>
                    <Link underline='always'>
                        See Order
                    </Link>
                </NextLink>
            )        
        }
    },

];

const rows = [
    { id: 1, payment: true, fullname: 'Carlos Manuel' },
    { id: 2, payment: true, fullname: 'Victor Bravo' },
    { id: 3, payment: false, fullname: 'Emin Reyes' },
    { id: 4, payment: false, fullname: 'Alex Sanchez' },
    { id: 5, payment: true, fullname: 'Fernamdo Herrera' },
    { id: 6, payment: false, fullname: 'Manolo Pablo' },
    { id: 7, payment: true, fullname: 'Juan Carlos Gonzalez' },
]


const HistoryPage = () => {
    return (
        <ShopLayout title='Orders History' pageDescription='Orders History of the Client'>
            <Typography variant='h1' component='h1'>Order history</Typography>
        
            <Grid container>
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>    
    )
}

export default HistoryPage;
