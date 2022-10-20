import { Box, CircularProgress } from '@mui/material'
import { ShopLayout } from '../../layouts'

export const FullScreenLoading = () => {
    return (
        <ShopLayout title='Page not found' pageDescription='There is nothing to show'>
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)' 
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <CircularProgress thickness={2} />
            </Box>
        </ShopLayout>
    )
}

