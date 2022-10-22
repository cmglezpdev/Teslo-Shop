import { useContext } from 'react';
import { Typography, Grid, Card, CardContent, Divider, Box, Button } from '@mui/material';
import { ShopLayout } from '../../layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart'
import { CartContext } from '../../context';

const CartPage = () => {

    const { cart } = useContext(CartContext);


    return (
        <ShopLayout 
            title={`Cart | ${cart.length} ${cart.length === 1 ? 'element' : 'elements'}`} 
            pageDescription='Store Shopping Cart'
        >
            <Typography variant='h1' component='h1'>Cart</Typography>
        
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList
                        cart={cart}
                        editable 
                    />
                </Grid>
                
                <Grid item xs={12} sm={5}>
                    <Card className='summary-cart'>
                        <CardContent>
                            <Typography variant='h2'>Order</Typography>
                            <Divider sx={{my:1}} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button className='circular-btn' color='secondary' fullWidth>
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
