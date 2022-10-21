import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link'
import { Card, Grid, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct
}

export const ProductCard:FC<Props> = ({ product }) => {
    
    const [isHovered, setIsHovered] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
                ? `/products/${product.images[1]}`
                : `/products/${product.images[0]}`
    }, [isHovered, product.images])

    return (
        <Grid item
            xs={6}
            sm={4}
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <Card>
                <CardActionArea>
                    <NextLink href='/product/slug' passHref prefetch={false}>
                        <Link>
                            <CardMedia 
                                className='fadeIn'
                                component='img'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsLoaded(true)}
                            />
                        </Link>
                    </NextLink>
                </CardActionArea>
            </Card>
            
            {
                isLoaded
                    ? (
                        <Box sx={{ mt: 1 }} className='fadeIn'>
                            <Typography fontWeight={700}>{product.title}</Typography>
                            <Typography fontWeight={500}>${product.price}</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ mt: 1, height: 87 }}></Box>
                    )
            }
        </Grid>
    )
}
