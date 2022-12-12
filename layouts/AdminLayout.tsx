import { FC, ReactNode } from 'react';
import { SideMenu } from '../components/ui';
import { AdminNavbar } from '../components/admin';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

interface Props {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
    children: ReactNode;
}

export const AdminLayout:FC<Props> = ({ children, title, subtitle, icon }) => {
    return (
        <>
            <nav>
                 <AdminNavbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0 30px'
            }}>
                <Box display='flex' flexDirection='column'>
                    <Typography variant='h1' component='h1'>
                        { icon }
                        { title }
                    </Typography>
                    <Typography variant='h2' sx={{ mb: 1 }}>
                        { subtitle }
                    </Typography>
                </Box>

                { children }
            </main>
        </>
    )
}
