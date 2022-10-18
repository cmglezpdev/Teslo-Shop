import type { NextPage } from 'next'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import { ShopLayout } from '../layouts'
import { initialData } from '../database/products';
import { ProductList } from '../components/products';


import { IProduct } from '../interfaces';



const Home: NextPage = () => {
  return (
    <ShopLayout
      title='Teslo Shop | Home'
      pageDescription='The better products of Teslo here!'
    >
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All the Products</Typography>
    
      <ProductList 
        products={initialData.products as IProduct[]}
      />
    </ShopLayout>
  )
}

export default Home
