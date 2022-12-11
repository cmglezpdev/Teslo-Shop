import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material';
import { CartContext } from '../../context';
import { ShopLayout } from '../../layouts';
import { CartList, OrderSummary } from '../../components/cart'
import { countries } from '../../database/data/countries';


const SummaryPage = () => {

    const router = useRouter();
    const { cart, shippingAddress, createOrder } = useContext( CartContext )
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if( !shippingAddress ) {
        return <></>
    }

    const { name, lastName, address, address_2 = '', city, country, phone, zip } = shippingAddress!;

    const onCreateOrder = async () => {
        setIsPosting(true);

        const { hasError, message } = await createOrder(); // todo: depende del resultado
        if( hasError ) {
            setErrorMessage(message);
            setIsPosting(false);
            return;
        }

        router.replace(`/order/${message}`)
    }


    return (
        <ShopLayout title='Order Summary' pageDescription='Order Summary'>
            <Typography variant='h1' component='h1' sx={{mb:2}}>Order Summary</Typography>
        
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
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

                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Button 
                                    className='circular-btn' 
                                    color='secondary' 
                                    fullWidth
                                    onClick={ onCreateOrder }
                                    disabled={ isPosting }
                                >
                                    Confirm Order
                                </Button>
                                
                                <Chip
                                    color='error'
                                    label={ errorMessage } 
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 1 }} 
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage;
