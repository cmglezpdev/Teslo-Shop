import { useContext } from 'react';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material';
import { CartContext } from '../../context';
import { ShopLayout } from '../../layouts';
import { CartList, OrderSummary } from '../../components/cart'
import { countries } from '../../database/data/countries';


const SummaryPage = () => {

    const { cart, shippingAddress, createOrder } = useContext( CartContext )
    
    if( !shippingAddress ) {
        return <></>
    }

    const { name, lastName, address, address_2 = '', city, country, phone, zip } = shippingAddress!;

    return (
        <ShopLayout title='Order Summary' pageDescription='Order Summary'>
            <Typography variant='h1' component='h1' sx={{mb:2}}>Order Summary</Typography>
        
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList
                        cart={cart}
                    />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Card className='summary-cart'>
                        <CardContent>
                            <Typography variant='h2'>Summary {`(${cart.length} ${cart.length === 1 ? 'product' : 'products'})`}</Typography>
                            
                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de Entrega</Typography>
                                <NextLink href='/checkout/address' passHref >
                                    <Link underline='always'>Edit</Link>
                                </NextLink>
                            </Box>

                            <Typography>{ name } { lastName }</Typography>
                            <Typography>{ address }{address_2 !== '' && ','} {address_2}</Typography>
                            <Typography>{ city }, { zip }</Typography>
                            {/* TODO: get the name from api */}
                            <Typography>{ countries.find(p => p.code === country)?.name }</Typography>
                            <Typography>{ phone }</Typography>
                            
                            <Divider sx={{my:1}} />
                            
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Order</Typography>
                                <NextLink href='/cart' passHref >
                                    <Link underline='always'>Edit</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}
                                onClick={() => createOrder()}
                            >
                                <Button className='circular-btn' color='secondary' fullWidth>
                                    Confirm Order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage;
