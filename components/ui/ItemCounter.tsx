import { FC, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

interface Props {
  currentQuantity: number;
  maxQuantity: number;
  updatedQuantity: (quantity: number) => void;
}

export const ItemCounter:FC<Props> = ({ currentQuantity, maxQuantity, updatedQuantity }) => {

    const [quantity, setQuantity] = useState(currentQuantity);

    const onUpdatedQuantity = (change: number) => {
      const newQ = Math.max( 1, Math.min( quantity + change, maxQuantity ) )
      setQuantity(newQ)
      updatedQuantity(newQ);
    }

    return (
      <Box display='flex' alignItems='center'>
        <IconButton
          onClick={() => onUpdatedQuantity(-1)}         
        >
          <RemoveCircleOutline />
        </IconButton>
        
        <Typography sx={{ width: 40, textAlign: 'center' }}>{ quantity }</Typography>
        
        <IconButton
          onClick={() => onUpdatedQuantity(+1)}
        >
          <AddCircleOutline />
        </IconButton>
        
      </Box>
    )
}
