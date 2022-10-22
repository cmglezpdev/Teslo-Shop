import { useState, useContext } from 'react';
import { GetStaticPaths, NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ShopLayout } from '../../layouts';
import { ProductSlideshow, ProductSizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { dbProducts } from '../../database';
import { CartContext } from '../../context';

interface Props {
    product: IProduct;
}

const ProductPage:NextPage<Props> = ({ product }) => {

    const router = useRouter();
    const { addProductToCart } = useContext(CartContext);
    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        inStock: product.inStock,
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1
    })

    const onSelectedSize = (size: ISize) => {
        const updCart = { ...tempCartProduct, size };
        setTempCartProduct(updCart)
    }

    const updatedQuantity = (newQuantity: number) => {
        setTempCartProduct({
            ...tempCartProduct,
            quantity: newQuantity
        })
    }

    const onAddToCart = () => {
        if( !tempCartProduct.size ) return;
        addProductToCart(tempCartProduct);
        router.push('/cart');
    }


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
                            <Typography variant='subtitle1'>Total</Typography>
                            <ItemCounter
                                currentQuantity={tempCartProduct.quantity}
                                updatedQuantity={updatedQuantity}
                                maxQuantity={product.inStock}
                            />
                            <ProductSizeSelector 
                                selectedSize={ tempCartProduct.size }
                                sizes={product.sizes}
                                onSelectedSize={onSelectedSize}
                            />
                        </Box>

                        <Button 
                            color='secondary' 
                            className='circular-btn'
                            sx={{ display: product.inStock === 0 ? 'none' : 'flex' }}
                            onClick={onAddToCart}
                        >
                            {
                                tempCartProduct.size
                                    ? 'Add to Cart'
                                    : 'Select a size'    
                            }
                        </Button>

                        <Chip 
                            label='Out of Stock' 
                            color='error' 
                            variant='outlined' 
                            sx={{ display: product.inStock === 0 ? 'flex' : 'none' }}
                        />

                        {/* Description */}
                        <Box sx={{mt: 3}}>
                            <Typography variant='subtitle1'>Description</Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    ) 
}

export default ProductPage;

export const getStaticPaths:GetStaticPaths = async(context) => {

    const slugs = await dbProducts.getAllProductsSlugs();
    const paths = slugs.map(({ slug }) => ({
        params: { slug }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {

    const { slug } = params as { slug:string };
    const product = await dbProducts.getProductBySlug(slug);

    if( !product ) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            product
        },
        revalidate: 86400
    }
}