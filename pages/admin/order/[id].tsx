import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip, CircularProgress } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrderSummary } from '../../../components/cart'
import { jwt } from '../../../services';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../layouts';

interface Props {
    order: IOrder;
}

const OrderPage:NextPage<Props> = ({ order }) => {

    const { orderItems, shippingAddress, summary } = order;
    
    return (
        <AdminLayout 
            title='Summary of the Order' 
            subtitle={`Order: ${order._id}`}
            icon={ <AirplaneTicketOutlined /> }
        >
            {
                order.isPaid 
                    ?( 
                        <Chip 
                        sx={{my: 2}}
                        label='Paid out'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                        />
                    ) : (
                        <Chip 
                        sx={{my: 2}}
                        label='Pending payment'
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined />}
                        />
                    )
            }

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList
                        cart={ orderItems }
                    />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Card className='summary-cart'>
                        <CardContent>
                            <Typography variant='h2'>Summary {`(${orderItems.length} ${ orderItems.length === 1 ? 'product' : 'products' })`}</Typography>
                            
                            <Divider sx={{my:1}} />
                            
                            <Typography variant='subtitle1'>Delivery Address</Typography>
                            <Typography>{`${shippingAddress.name} ${shippingAddress.lastName}`}</Typography>
                            <Typography>{`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.zip}`}</Typography>
                            <Typography>{`${shippingAddress.address_2}`}</Typography>
                            <Typography>{`${shippingAddress.country}`}</Typography>
                            <Typography>{`${shippingAddress.phone}`}</Typography>
                            
                            <Divider sx={{my:1}} />
                    
                            <OrderSummary
                                summary={summary}
                            />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>

                                <Box display='flex' flexDirection='column'>
                                {
                                    order.isPaid 
                                        ?( 
                                            <Chip 
                                            sx={{my: 2}}
                                            label='Paid out'
                                            variant='outlined'
                                            color='success'
                                            icon={<CreditScoreOutlined />}
                                            />
                                        ) : (
                                            <Chip 
                                            sx={{my: 2}}
                                            label='Pending payment'
                                            variant='outlined'
                                            color='error'
                                            icon={<CreditCardOffOutlined />}
                                            />
                                        )
                                }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default OrderPage;



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const { token = '' } = req.cookies;

    try {
        const order = await dbOrders.getOrderById(id.toString());
         if( !order ) 
            return {
                redirect: {
                    destination: 'admin/orders',
                    permanent: false
                }
            }

        return {
            props: { order }
        }

    } catch (error) {
        return {
            redirect: {
                destination: `/auth/login?p=/order/${id}`,
                permanent: false
            }
        }
    }
}