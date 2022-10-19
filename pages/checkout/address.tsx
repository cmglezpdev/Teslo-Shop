import { Typography, Grid, TextField, FormControl, MenuItem, InputLabel, Select, Box, Button, useTheme } from '@mui/material';
import { ShopLayout } from "../../layouts"


const AddressPage = () => {

    const { palette } = useTheme();

    return (
        <ShopLayout title='Address' pageDescription='Confirm destination address'>
            <Typography variant='h1' component='h1'>Address</Typography>
        
            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Name' variant='outlined' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Last Name' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Address' variant='outlined' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Address 2 (optional)' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Post Code' variant='outlined' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='City' variant='outlined' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        {/* <InputLabel>Country</InputLabel> */}
                        <Select variant='outlined'>
                            <MenuItem value={1}>Costa Rica</MenuItem>
                            <MenuItem value={2}>Honduras</MenuItem>
                            <MenuItem value={3}>El Salvador</MenuItem>
                            <MenuItem value={4}>Mexico</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Phone' variant='outlined' fullWidth />
                </Grid>
            </Grid>

            <Box sx={{mt:5}} display='flex' justifyContent='center'>
                <Button color='secondary' className='circular-btn' sx={{px: 5, color: 'white', backgroundColor: palette.primary.main}}>
                    Complete Order
                </Button>
            </Box>
        </ShopLayout>   
    )
}

export default AddressPage
