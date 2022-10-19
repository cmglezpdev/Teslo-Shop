import { FC } from 'react';
import { Box } from '@mui/system';

import { ISize } from '../../interfaces';
import { Button } from '@mui/material';

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
                        color={ selectedSize == size ? 'primary' : 'info' }
                        // color='success'
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}
