import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ShopLayout } from '../../layouts';
import { CartList, OrderSummary } from '../../components/cart'
import { jwt } from '../../services';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { tesloApi } from '../../api';

type OrderResponseBody = {
    id: string;
    status: 
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED"
};

interface Props {
    order: IOrder;
}

const OrderPage:NextPage<Props> = ({ order }) => {

    const router = useRouter();
    const [isPaying, setIsPaying] = useState(false);
    const { orderItems, shippingAddress, summary } = order;
    
    const onOrderComplete = async (details: OrderResponseBody) => {
        if( details.status !== 'COMPLETED' ) {
            return alert('No hay pago en Paypal');
        }

        setIsPaying(true);
        try {
            const { data } = await tesloApi.post('/orders/pay', {
                transactionId: details.id,
                orderId: order._id
            })
            router.reload();            

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert("Error");
        }
    }


    return (
        <ShopLayout title='Summary of the Order' pageDescription='Summary of the Order'>
            <Typography variant='h1' component='h1' sx={{mb:2}}>Order: {order._id}</Typography>
        
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

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Delivery Address</Typography>
                                <NextLink href='/checkout/address' passHref >
                                    <Link underline='always'>Edit</Link>
                                </NextLink>
                            </Box>

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

                                <Box 
                                    display={isPaying ? 'flex' : 'none'}
                                    justifyContent='center' 
                                    className='fadeIn'
                                >
                                    <CircularProgress />
                                </Box>

                                <Box display={isPaying ? 'none' : 'flex'} flexDirection='column'>
                                    {
                                        order.isPaid
                                            ? (
                                                <Chip 
                                                sx={{my: 2}}
                                                label='Paid out'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                                />
                                            ) : (
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: order.summary.totalCost.toString(),
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order!.capture().then((details) => {
                                                            onOrderComplete(details);
                                                        });
                                                    }}
                                                />
                                            )
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage;



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const { token = '' } = req.cookies;

    try {
        const userId = await jwt.isValidToken(token);
        const order = await dbOrders.getOrderById(id.toString());
         if( !order || order.user !== userId ) 
            return {
                redirect: {
                    destination: '/orders/history',
                    permanent: false
                }
            }
        

        return {
            props: {
                order
            }
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