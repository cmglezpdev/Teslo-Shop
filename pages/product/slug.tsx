import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ShopLayout } from '../../layouts';

import { initialData } from '../../database/products';
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';

const product = initialData.products[0];


const ProductPage = () => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow 
                        images={ product.images }
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titles */}
                        <Typography variant='h1' component='h1'>{product.title}</Typography>
                        <Typography variant='subtitle1' component='h2'>$2{product.price}</Typography>
                    
                        <Box sx={{my: 2}}>
                            <Typography variant='subtitle2'>Total</Typography>
                            
                            <ItemCounter />
                        </Box>

                        {/* Add to Cart */}
                        <Button color='secondary' className='circular-btn'>
                            Add to Cart
                        </Button>

                        {/* <Chip label='Not available' color='error' variant='outlined' /> */}

                        {/* Description */}
                        <Box sx={{mt: 3}}>
                            <Typography variant='subtitle2'>Description</Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    ) 
}

export default ProductPage;
