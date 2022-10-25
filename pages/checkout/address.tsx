import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Typography, Grid, TextField, FormControl, MenuItem, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie';
import { ShopLayout } from "../../layouts"
import { countries } from '../../database/data/countries'
import { IAddress } from '../../interfaces';
import { CartContext } from '../../context';

const getAddressFromCookie = ():IAddress => {
    const defaultState:IAddress = {
        name: '',
        lastName: '',
        address: '',
        address_2: '',
        zip: '',
        country: 'US',
        city: '',
        phone: '',
    }

    const addressInCookies = JSON.parse(Cookies.get('address') || '{}');
    return {
        ...defaultState,
        ...addressInCookies
    }
}


const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext( CartContext );
    const { register, handleSubmit, formState: { errors } } = useForm<IAddress>({
        defaultValues: getAddressFromCookie()
    });

    const onCheckAddress = ( data:IAddress ) => {
        updateAddress(data);
        router.push('/checkout/summary')
    }

    return (
        <ShopLayout title='Address' pageDescription='Confirm destination address'>
            <Typography variant='h1' component='h1'>Address</Typography>
        
            <form onSubmit={handleSubmit(onCheckAddress)}>
                <Grid container spacing={2} sx={{mt:2}}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Name' 
                            variant='outlined'
                            fullWidth 
                            {...register('name', {
                                required: 'The name is required',
                                minLength: { value: 2, message: 'At least three characters' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Last Name' 
                            variant='outlined' 
                            fullWidth 
                            {...register('lastName', {
                                required: 'The Last Name is required',
                            })}
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Address' 
                            variant='outlined' 
                            fullWidth 
                            {...register('address', {
                                required: 'The address is required',
                            })}
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Address 2 (optional)' 
                            variant='outlined' 
                            fullWidth 
                            {...register('address_2')}
                            error={ !!errors.address_2 }
                            helperText={ errors.address_2?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Zip'
                            variant='outlined' 
                            fullWidth 
                            {...register('zip', {
                                required: 'The Postal Code is required',
                            })}
                            error={ !!errors.zip }
                            helperText={ errors.zip?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='City' 
                            variant='outlined' 
                            fullWidth 
                            {...register('city', {
                                required: 'The city is required',
                            })}
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select 
                                variant='outlined'
                                label='Country'
                                defaultValue='US'
                                {...register('country', {
                                    required: 'The country is required',
                                })}
                                error={ !!errors.country } 
                                helperText={ errors.country?.message }  
                            >
                                {
                                    countries.map(({ code, name }) => (
                                        <MenuItem value={code} key={code}>
                                            <Typography fontWeight='400'>{ name }</Typography>
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    {/* TODO: Agregar un listado lateral con el codigo de numero */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Phone' 
                            variant='outlined'
                            fullWidth 
                            {...register('phone', {
                                required: 'The Phone is required',
                            })}
                            error={ !!errors.phone }
                            helperText={ errors.phone?.message }
                        />
                    </Grid>
                </Grid>

                <Box sx={{mt:5}} display='flex' justifyContent='center'>
                    <Button 
                        type='submit'
                        color='secondary' 
                        className='circular-btn' 
                        sx={{ px: 5, py: 1 }}
                    >
                        Complete Order
                    </Button>
                </Box>
            </form>
        </ShopLayout>   
    )
}

export default AddressPage
