import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip, useTheme } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart'

const OrderPage = () => {

    const { palette } = useTheme();

    return (
        <ShopLayout title='Summary of the Order 3263573' pageDescription='Summary of the Order 3263573'>
            <Typography variant='h1' component='h1' sx={{mb:2}}>Order: ABC123</Typography>
        
            {/* <Chip 
                sx={{my: 2}}
                label='Pending payment'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined />}
            /> */}

            <Chip 
                sx={{my: 2}}
                label='Paid out'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />


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
                                <Button className='circular-btn' sx={{color: 'white', backgroundColor: palette.primary.main}} fullWidth>
                                    Pay
                                </Button>

                                <Chip 
                                    sx={{my: 2}}
                                    label='Paid out'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                 />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage;
