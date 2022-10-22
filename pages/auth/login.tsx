import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../layouts';
import { validations } from '../../utils';

type FormData = {
    email: string,
    password: string,
}

const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onLoginUser = ( data:FormData ) => {
        console.log(data);
    }

    return (
        <AuthLayout title='Log in to the store'>
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px', mt: '50px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography textAlign='center' variant='h1' component='h1'>Log in to the store</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='email' 
                                type='email'
                                variant='outlined' 
                                fullWidth
                                { ...register('email', {
                                    required: 'This field is required',
                                    validate: (val) => validations.isEmail(val)
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label='password' 
                                type='password' 
                                variant='outlined' 
                                fullWidth
                                { ...register('password', {
                                    required: 'This field is required',
                                    minLength: { value: 8, message: "At least eight characters" }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                type='submit'
                                className='circular-btn' 
                                size='large' 
                                color='secondary' 
                                fullWidth
                            >
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
            </form>
        </AuthLayout>
    )
}

export default LoginPage;
