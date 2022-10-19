import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material';
import { ShopLayout } from '../../layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart'

const SummaryPage = () => {
    return (
        <ShopLayout title='Order Summary' pageDescription='Order Summary'>
            <Typography variant='h1' component='h1' sx={{mb:2}}>Order Summary</Typography>
        
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Card className='summary-cart'>
                        <CardContent>
                            <Typography variant='h2'>Summary (3 products)</Typography>
                            
                            <Divider sx={{my:1}} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de Entrega</Typography>
                                <NextLink href='/checkout/address' passHref >
                                    <Link underline='always'>Edit</Link>
                                </NextLink>
                            </Box>

                            <Typography>Fernando Herrera</Typography>
                            <Typography>3q3 Algun Lugar</Typography>
                            <Typography>Stittsville, HYA 235</Typography>
                            <Typography>Canadá</Typography>
                            <Typography>+1 467483932</Typography>
                            
                            <Divider sx={{my:1}} />
                            
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Order</Typography>
                                <NextLink href='/cart' passHref >
                                    <Link underline='always'>Edit</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
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
