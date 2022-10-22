import type { NextPage, GetServerSideProps } from 'next'
import { Box, Typography } from '@mui/material'

import { ShopLayout } from '../../layouts'
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout
      title='Teslo Shop | Search'
      pageDescription='Search the better products here!'
    >
      <Typography variant='h1' component='h1'>Search Products</Typography>
      {
        foundProducts
            ? <Typography variant='h2' sx={{ mb: 1 }}><strong>Query: </strong>{ query }</Typography> 
            : (
                <Box display='flex'>
                    <Typography variant='h2' sx={{ mb: 1 }}>We did not find any product</Typography> 
                    <Typography variant='h2' sx={{ ml: 1 }} color='secondary'>{ query }</Typography> 
                </Box>
            )
      }
    
      <ProductList products={ products } /> 

    </ShopLayout>
  )
}

export default SearchPage;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query } = params as { query: string }
    
    let products = await dbProducts.getProductByTerm(query);
    const foundProducts = products.length > 0;

    if( !foundProducts )
        products = await dbProducts.getAllProducts();

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}