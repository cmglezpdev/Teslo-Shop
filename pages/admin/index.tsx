import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { AdminLayout } from '../../layouts/AdminLayout';
import { SummaryTile } from '../../components/admin';
import { DashboardSummaryResponse } from '../../interfaces';

import { 
    AccessTimeOutlined, 
    AttachMoneyOutlined, 
    CancelPresentationOutlined, 
    CategoryOutlined, 
    CreditCardOffOutlined, 
    CreditCardOutlined, 
    DashboardOutlined, 
    GroupOutlined, 
    ProductionQuantityLimitsOutlined 
} from '@mui/icons-material';


const DashboardPage:NextPage = () => {
    
    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', { 
        refreshInterval: 30000  // 30 seconds
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn((prev) => (prev - 1 + 31)%31);
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    
    if( !error && !data ) {
        return <></>
    }

    if( error ) {
        console.log(error);
        return <Typography>Error to load the information</Typography>
    }

    const { 
        paidOrders,
        notPaidOrders,
        numberOfOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventary,
        lowInventary
     } = data!;

    return (
        <AdminLayout
            title='Dashboard'
            subtitle='General Statistics'
            icon={ <DashboardOutlined /> }
        >
            <Grid container spacing={2}>
                <SummaryTile 
                    title={ numberOfOrders } 
                    subTitle="Total Orders" 
                    icon={ <CreditCardOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ paidOrders } 
                    subTitle="Paid Orders" 
                    icon={<AttachMoneyOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ notPaidOrders } 
                    subTitle="Pending Orders" 
                    icon={<CreditCardOffOutlined color='error' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ numberOfClients }
                    subTitle="Clients" 
                    icon={<GroupOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ numberOfProducts } 
                    subTitle="Products" 
                    icon={<CategoryOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ productsWithNoInventary } 
                    subTitle="Out of Stock" 
                    icon={<CancelPresentationOutlined color='error' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ lowInventary } 
                    subTitle="Low Inventary" 
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ refreshIn } 
                    subTitle="Loading in: " 
                    icon={<AccessTimeOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                
            </Grid>


        </AdminLayout>
    )
}

export default DashboardPage;
