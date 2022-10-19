import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography, useTheme } from '@mui/material';
import { AuthLayout } from '../../layouts';


const LoginPage = () => {

    return (
        <AuthLayout title='Log in to the store'>
            <Box sx={{ width: 350, padding: '10px 20px', mt: '50px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography textAlign='center' variant='h1' component='h1'>Log in to the store</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='email' variant='outlined' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='password' type='password' variant='outlined' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button className='circular-btn' size='large' color='secondary' fullWidth>
                            Log In
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/register' passHref>
                            <Link underline='always'>
                                {`Don't you have an account?`}
                            </Link>
                        </NextLink>   
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default LoginPage;
