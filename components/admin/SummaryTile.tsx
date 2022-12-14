import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
    title: string | number;
    subTitle: string;
    icon?: JSX.Element;
}

export const SummaryTile:FC<Props> = ({ title, subTitle, icon }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{display: 'flex'}}>
                <CardContent sx={{width: 50, display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                    { icon } 
                    {/* <CreditCardOffOutlined color='secondary' sx={{fontSize: 40}} /> */}
                </CardContent>
                <CardContent sx={{flex: '1 0 auto', display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h3'>{ title }</Typography>
                    <Typography variant='h6'>{ subTitle }</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
