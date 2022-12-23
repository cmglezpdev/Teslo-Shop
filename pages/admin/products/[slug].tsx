import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { dbProducts } from '../../../database';
import { AdminLayout } from '../../../layouts';
import { IProduct } from '../../../interfaces';


const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']


interface FormData {
    _id?:        number;
    description: string;
    images:      string[];
    inStock:     number;
    price:       number;
    sizes:       string[];
    slug:        string;
    tags:        string[];
    title:       string;
    type:        string;
    gender:      string;
}


interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    const [tagInput, setTagInput] = useState('');

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product,
    })

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if( name === 'title' ) {
                const newSlug = value.title?.trim()
                                .replaceAll(' ', '_')
                                .replaceAll("'", '')
                                .toLocaleLowerCase() || '';
                setValue('slug', newSlug)
            }
        })
        return () => subscription.unsubscribe();
    }, [ watch, setValue ])

    const onChangeSize = ( size: string ) => {
        const currentSizes = getValues('sizes');
        if( currentSizes.includes(size) )
            return setValue(
                'sizes',
                currentSizes.filter(s => s !== size),
                { shouldValidate: true }
            )
        return setValue(
            'sizes',
            [...currentSizes, size],
            { shouldValidate: true }
        );
    }

    const onNewTag = () => {
        const tag  = tagInput.trim().toLowerCase();
        setTagInput('');
        const tags = getValues('tags');
        setValue(
            'tags',
            tags.includes(tag) ? tags : [...tags, tag],
            { shouldValidate: true }
        )
    }

    const onDeleteTag = ( tag: string ) => {
        const currentTags = getValues('tags');
        console.log(currentTags)
        setValue('tags', currentTags.filter(t => t !== tag), { shouldValidate: true })
    }

    const onSubmit = ( formData: FormData ) => {
        console.log(formData)
    }

    return (
        <AdminLayout 
            title={'Product'} 
            subtitle={`Editing: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={handleSubmit( onSubmit )}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        >
                        Save
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Title"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'This Field is required',
                                minLength: { value: 2, message: 'At least two characters' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Description"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'This Field is required',
                                minLength: { value: 2, message: 'At least two characters' }
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="In Stock"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'This Field is required',
                                minLength: { value: 0, message: 'At least zero value' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Price"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'This Field is required',
                                minLength: { value: 0, message: 'At least zero value' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Type</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={({ target }) => setValue('type', target.value, { shouldValidate: true } )}
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') }
                                onChange={ ({ target }) => setValue('gender', target.value, { shouldValidate: true }) }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Sizes</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel
                                        key={size} 
                                        control={<Checkbox checked={ getValues('sizes').includes(size) }/>} 
                                        onChange={() => onChangeSize(size)}
                                        label={ size } 
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'This Field is required',
                                validate: (val) => val.trim().includes(' ') ? 'No white spaces' : undefined, 
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Tags"
                            variant="filled"
                            value={ tagInput }
                            onChange={({ target }) => setTagInput(target.value)}
                            onKeyUp={ ({ code }) => code === 'Space' ? onNewTag() : null }
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Press [spacebar] to save"
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Images</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                            >
                                Upload Images
                            </Button>

                            <Chip 
                                label="At least two images are required"
                                color='error'
                                variant='outlined'
                            />

                            <Grid container spacing={2}>
                                {
                                    product.images.map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `/products/${ img }` }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error">
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    const product = await dbProducts.getProductBySlug(slug.toString());

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage