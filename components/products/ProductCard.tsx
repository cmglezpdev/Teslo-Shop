import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link'
import { Card, Grid, CardActionArea, CardMedia, Box, Typography, Link, Chip } from '@mui/material';
import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct
}

export const ProductCard:FC<Props> = ({ product }) => {
    
    const [isHovered, setIsHovered] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
                ? `${product.images[1]}`
                : `${product.images[0]}`
    }, [isHovered, product.images])

    return (
        <Grid item
            xs={6}
            sm={4}
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <Card>
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <Chip
                                color='primary'
                                label='Out of Stock'
                                sx={{ 
                                    display: (product.inStock === 0) ? 'flex': 'none',
                                    position: 'absolute', 
                                    zIndex: 99, 
                                    top: '10px', 
                                    left: '10px' 
                                }}
                            />
                            <CardMedia 
                                className='fadeIn'
                                component='img'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
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
