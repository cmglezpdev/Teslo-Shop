import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ShopLayout } from "../layouts"

const Custom404Page = () => {
    return (
        <ShopLayout title='Page not found' pageDescription='There is nothing to show'>
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)' 
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <Typography variant="h1" component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
                <Typography marginLeft={2}>Nothing found</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404Page
