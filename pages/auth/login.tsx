import { useState, useContext, useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
    email:    string,
    password: string,
}

const LoginPage = () => {

    const router = useRouter();
    const { loginUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const lastPageBeforeLogin = useMemo(() => router.query.p?.toString(), [router.query] );

    const onLoginUser = async ( { email, password }:FormData ) => {
        setShowError(false);
        
        const loggedUser = await loginUser(email, password); 

        if( !loggedUser ) {
            console.error('Error in the credentials')
            setShowError(true);

            setTimeout(() => {
                setShowError(false)
            }, 3000);

            return;
        }
        
        const destination = lastPageBeforeLogin || '/';
        router.replace(destination)
    }

    return (
        <AuthLayout title='Log in to the store'>
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px', mt: '50px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display='flex' alignItems='center' flexDirection='column'>
                            <Typography textAlign='center' variant='h1' component='h1'>Log in to the store</Typography>
                            <Chip 
                                label="This user is not recognized"
                                color='error'
                                icon={<ErrorOutlined />}
                                sx={{ mt:2, display: showError ? 'flex' : 'none' }}
                                className='fadeIn'
                            />
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
                                disabled={showError} 
                                fullWidth
                            >
                                Log In
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={`/auth/register${lastPageBeforeLogin ? `?p=${lastPageBeforeLogin}` : ''}`} 
                                passHref
                            >
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
