import { Typography, Grid, Card, CardContent, Divider, Box, Button, useTheme } from '@mui/material';
import { ShopLayout } from '../../layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart'

const CartPage = () => {

    const { palette } = useTheme();

    return (
        <ShopLayout title='Cart | 3 elements' pageDescription='Store Shopping Cart'>
            <Typography variant='h1' component='h1'>Cart</Typography>
        
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Card className='summary-cart'>
                        <CardContent>
                            <Typography variant='h2'>Order</Typography>
                            <Divider sx={{my:1}} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button className='circular-btn' sx={{color: 'white', backgroundColor: palette.primary.main}} fullWidth>
                                    Checkout
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </ShopLayout>
    )
}

export default CartPage;
