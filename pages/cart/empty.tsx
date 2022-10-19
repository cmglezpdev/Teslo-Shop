import NextLink from 'next/link'
import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../layouts';

const EmptyPage = () => {
    return (
        <ShopLayout title='Empty Cart' pageDescription='Do not have products yet'>
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)' 
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Your cart is empty yet</Typography>
                    <NextLink href='/' passHref>
                        <Link typography='h4' color='secondary'>
                            Go to Home
                        </Link>
                    </NextLink>
                </Box>

            </Box>
        </ShopLayout>
    )
}

export default EmptyPage;
