import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Typography } from "@mui/material";
import { useProducts } from "../hooks";
import { ShopLayout } from "../../layouts";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from '../../components/products';

import { SHOP_CONSTANTS } from '../../database/constants';

interface Props {
    gender: string;
}

const CategoryPage:NextPage<Props> = ({ gender }) => {
    
    const { products, isLoading } = useProducts(`/products?gender=${gender}`);
    
    return (
        <ShopLayout
            title={`Products by Category | ${gender}`}
            pageDescription={`All products about the category ${gender}`}
        >
            <Typography variant='h1' component='h1'>Shop</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>All the Products</Typography>
      
            {
            isLoading
                ? <FullScreenLoading />
                : <ProductList products={ products } /> 
            }
  
        </ShopLayout>
    )
}

export default CategoryPage;


export const getStaticPaths: GetStaticPaths = async (ctx) => {
     
    const paths = SHOP_CONSTANTS.validGenders.map(gender => ({
        params: { gender }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { gender } = params as { gender: string };
    if( !SHOP_CONSTANTS.validGenders.includes(gender) ) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            gender        
        }
    }
}