import { FC, useContext } from 'react';
import NextLink from 'next/link' 
import { Typography, Link, Grid, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { ItemCounter } from '../ui';
import { ICartProduct } from '../../interfaces';
import { CartContext } from '../../context';

interface Props {
    editable?: boolean;
    cart: ICartProduct[];
}

export const CartList:FC<Props> = ({ editable, cart }) => {
    
    const { updateCartQuantity } = useContext(CartContext);

    const onNewQuantityValue = (product:ICartProduct, newQuantityValue:number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product)
    }
    
    return (
        <>
            {
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
                        <Grid item xs={3}>
                            {/* Go to the product page */}
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{borderRadius: '5px'}}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>Size: <strong>{ product.size }</strong></Typography>
                            
                                {
                                    editable 
                                        ? <ItemCounter 
                                            currentQuantity={product.quantity}
                                            maxQuantity={product.inStock}
                                            updatedQuantity={(value) => onNewQuantityValue(product, value)}
                                        />
                                        : <Typography variant='h5'>{`${product.quantity} ${ product.quantity === 1 ? 'item' : 'items' }`}</Typography>
                                }
                                
                            </Box>
                        </Grid>

                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>${product.price}</Typography>
                            {
                                editable && 
                                (<Button variant='text' color='secondary'>
                                    Remove
                                </Button>)
                            }
                        </Grid>


                    </Grid>
                ))
            }
        </>
    )
}
