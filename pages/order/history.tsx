import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ShopLayout } from '../../layouts';
import { jwt } from '../../services';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

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
                    : <Chip color='error' label='Pending payment' variant='outlined' />
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

interface Props {
    orders: IOrder[];
}

const HistoryPage:NextPage<Props> = ({ orders }) => {

    const [allOrders, setAllOrders] = useState<{payment:boolean; id: string; fullname: string}[]>([]);

    useEffect(() => {
        const rows = [
            ...orders.map(order => ({
                payment: order.isPaid,
                id: order._id!,
                fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastName}` 
            }))
        ]
        setAllOrders(rows);
    }, [orders])


    return (
        <ShopLayout title='Orders History' pageDescription='Orders History of the Client'>
            <Typography variant='h1' component='h1'>Order history</Typography>
        
            <Grid container sx={{mt: 2}} className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={allOrders}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = '' } = req.cookies;
    
    try {
        const userId = await jwt.isValidToken(token);
        const orders = await dbOrders.getOrdersFromUser(userId);

        if( !orders )
            return {
                redirect: { destination: '/', permanent: false }
            }

        return {
            props: { orders }
        }

    } catch (error) {
        return {
            redirect: {
                destination: '/auth/login?p=/order/history',
                permanent: false
            }
        }
    }
}