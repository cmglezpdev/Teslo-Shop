import { FC } from 'react';
import { Box, Button } from '@mui/material';

import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: string;
    sizes: ISize[];
}

export const ProductSizeSelector:FC<Props> = ({ selectedSize, sizes }) => {
    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={ size === selectedSize ? 'primary' : 'info' }
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}
