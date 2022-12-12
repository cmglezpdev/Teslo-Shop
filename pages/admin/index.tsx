import { NextPage } from 'next';
import { Grid } from '@mui/material';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../layouts/AdminLayout';
import { SummaryTile } from '../../components/admin';

const DashboardPage:NextPage = () => {
    return (
        <AdminLayout
            title='Dashboard'
            subtitle='General Statistics'
            icon={ <DashboardOutlined /> }
        >

            <Grid container spacing={2}>
                <SummaryTile 
                    title={ 1 } 
                    subTitle="Total Orders" 
                    icon={ <CreditCardOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 2 } 
                    subTitle="Paid Orders" 
                    icon={<AttachMoneyOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 2 } 
                    subTitle="Pending Orders" 
                    icon={<CreditCardOffOutlined color='error' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 3 }
                    subTitle="Clients" 
                    icon={<GroupOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 20 } 
                    subTitle="Products" 
                    icon={<CategoryOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 4 } 
                    subTitle="Out of Stock" 
                    icon={<CancelPresentationOutlined color='error' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 4 } 
                    subTitle="Low Inventary" 
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{fontSize: 40}} />} 
                />
                <SummaryTile 
                    title={ 8 } 
                    subTitle="Loading in: " 
                    icon={<AccessTimeOutlined color='secondary' sx={{fontSize: 40}} />} 
                />
                
            </Grid>


        </AdminLayout>
    )
}

export default DashboardPage;
