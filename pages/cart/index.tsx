import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material';
import { ShopLayout } from '../../layouts/ShopLayout';
import { CartList } from '../../components/cart'

const CartPage = () => {
    return (
        <ShopLayout title='Cart | 3 elements' pageDescription='Store Shopping Cart'>
            <Typography variant='h1' component='h1'>Cart</Typography>
        
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Card className='summary-cart'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{my:1}} />

                            {/* Order Summary */}

                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
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
