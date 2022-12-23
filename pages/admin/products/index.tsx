import NextLink from 'next/link';
import { Grid, CardMedia, Link } from '@mui/material';
import { CategoryOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AdminLayout } from '../../../layouts/AdminLayout';
import useSWR from 'swr';
import { IProduct } from '../../../interfaces';

const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Image',
        renderCell: ({row}: GridRenderCellParams) => {
            return (
                <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
                    <CardMedia
                        component='img'
                        className='fadeIn'
                        alt={row.title}
                        image={`/products/${row.img}`}
                    />
                </a>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 250,
        renderCell: ({row}: GridRenderCellParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                        { row.title }
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Gender' },
    { field: 'type', headerName: 'Type' },
    { field: 'inStock', headerName: 'In Stock' },
    { field: 'price', headerName: 'Price' },
    { field: 'sizes', headerName: 'Sizes', width: 250 },
]


const ProductsPage = () => {
    
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if( !data && !error ) {
        return <h1>Loading...</h1>
    }

    const rows = data!.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }))
    
    return (
        <AdminLayout
            title={`Products (${data?.length})`}
            subtitle='Manage the products'
            icon={ <CategoryOutlined /> }
        >
            <Grid container sx={{mt: 2}} className='fadeIn'>
                <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default ProductsPage;