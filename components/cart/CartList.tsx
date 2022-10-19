import { FC } from 'react';
import NextLink from 'next/link' 
import { Typography, Link, Grid, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { ItemCounter } from '../ui';

import { initialData } from "../../database/products"
const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}

export const CartList:FC<Props> = ({ editable }) => {
    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{mb:1}}>
                        <Grid item xs={3}>
                            {/* Go to the product page */}
                            <NextLink href='/product/slug' passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={`products/${product.images[0]}`}
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
                                <Typography variant='body1'>Size: <strong>M</strong></Typography>
                            
                                {
                                    editable 
                                        ? <ItemCounter />
                                        : <Typography variant='h5'>3 items</Typography>
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
