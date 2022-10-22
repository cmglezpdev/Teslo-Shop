import { FC } from 'react';
import { Box, Button } from '@mui/material';

import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: string;
    sizes: ISize[];
    onSelectedSize: (size: ISize) => void;
}

export const ProductSizeSelector:FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={ size === selectedSize ? 'primary' : 'info' }
                        onClick={() => onSelectedSize(size)}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}
