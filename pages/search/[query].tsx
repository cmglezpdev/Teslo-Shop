import type { NextPage, GetServerSideProps } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../../layouts'
import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {

  return (
    <ShopLayout
      title='Teslo Shop | Search'
      pageDescription='Search the better products here!'
    >
      <Typography variant='h1' component='h1'>Search Product</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>ABC --- 123</Typography>
    
      <ProductList products={ products } /> 

    </ShopLayout>
  )
}

export default SearchPage;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query } = params as { query: string }
    const products = await dbProducts.getProductByTerm(query);

    console.log(products)
    return {
        props: {
            products
        }
    }
}