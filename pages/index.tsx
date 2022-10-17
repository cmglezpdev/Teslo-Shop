import type { NextPage } from 'next'
import { Typography } from '@mui/material'

import { ShopLayout } from '../layouts'

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='Teslo Shop | Home'
      pageDescription='The better products of Teslo here!'
    >
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All the Products</Typography>
    </ShopLayout>
  )
}

export default Home
