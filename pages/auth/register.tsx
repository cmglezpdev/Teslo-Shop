import { useState, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { ErrorOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context';
import { AuthLayout } from '../../layouts';
import { validations } from '../../services';

type FormData = {
    name:     string,
    email:    string,
    password: string,
}

type TypeError = {
    hasError: boolean,
    message?: string | undefined
}

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState<TypeError>({ hasError: false });
    const lastPageBeforeLogin = useMemo(() => router.query.p?.toString(), [router.query] );

    const onRegisterUser = async ( { name, email, password }:FormData ) => {

        const response = await registerUser(name, email, password);
        if( response.hasError ) {
            console.error(response.message)
            setError({
                hasError: true,
                message: response.message
            })
            setTimeout(() => {
                setError({ hasError: false })
            }, 3000);
            return;
        }

        const destination = lastPageBeforeLogin || '/';
        router.replace( destination )
    }

    return (
        <AuthLayout title='Register in the store'>
            <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px', mt: '50px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography textAlign='center' variant='h1' component='h1'>Register in the store</Typography>
                            <Chip 
                                label={error.message}
                                // label="Can not create this user"
                                color='error'
                                icon={<ErrorOutlined />}
                                sx={{ mt:2, display: error.hasError ? 'flex' : 'none' }}
                                className='fadeIn'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='name' 
                                variant='outlined' 
                                fullWidth 
                                {...register('name', {
                                    required: 'This field is required',
                                    minLength: { value: 3, message: "At least three characters" }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                label='email' 
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
                                Register
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={`/auth/login${ lastPageBeforeLogin ? `?p=${lastPageBeforeLogin}` : '' }`} 
                                passHref
                            >
                                <Link underline='always'>
                                    {`Do you have an account?`}
                                </Link>
                            </NextLink>   
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;
