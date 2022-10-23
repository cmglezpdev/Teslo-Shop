import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from '../../context';
import { currency } from '../../services';


export const OrderSummary = () => {

    const { summary } = useContext(CartContext)

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>Products</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ summary.numberOfProducts } {summary.numberOfProducts === 1 ? 'product' : 'products'}</Typography>
            </Grid>
 
            <Grid item xs={6}>
                <Typography>Sub Total</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ currency.format(summary.subTotal) }</Typography>
            </Grid>
 
            <Grid item xs={6}>
                <Typography>Taxes [{ summary.taxRate * 100 }%]</Typography>
            </Grid>

            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{ currency.format(summary.tax) }</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt: 2}}>
                <Typography variant='subtitle1'>Total:</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt: 2}} display='flex' justifyContent='end'>
                <Typography variant='subtitle1'>{ currency.format(summary.totalCost) }</Typography>
            </Grid>
     
        </Grid>
    )
}
