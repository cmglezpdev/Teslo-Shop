import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material'
import { AuthLayout } from '../../layouts';


const RegisterPage = () => {

    // const theme = useTheme();
    // const palette = theme.palette;

    // console.log(theme)


    return (
        <AuthLayout title='Register in the store'>
            <Box sx={{ width: 350, padding: '10px 20px', mt: '50px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography textAlign='center' variant='h1' component='h1'>Register in the store</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='name' variant='outlined' fullWidth />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField label='email' variant='outlined' fullWidth />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField label='password' type='password' variant='outlined' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button className='circular-btn' size='large' color='secondary' fullWidth>
                            Register
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref>
                            <Link underline='always'>
                                {`Do you have an account?`}
                            </Link>
                        </NextLink>   
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage;
