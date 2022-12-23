import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { 
    Box, Divider, Drawer, IconButton, Input, 
    InputAdornment, List, ListItem, ListItemIcon, 
    ListItemText, ListSubheader 
} from "@mui/material"

import { 
    AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, 
    ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, 
    FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined 
} from "@mui/icons-material"

import { AuthContext, UIContext } from '../../context';


export const SideMenu = () => {

    const router = useRouter();
    const { toggleSideMenu, isMenuOpen } = useContext(UIContext);
    const { user, isLoggedIn, logoutUser } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = (address: string) => {
        router.push(address)
        toggleSideMenu();
    }

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={() => toggleSideMenu()}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            type='text'
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {isLoggedIn && (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary='Profile' />
                            </ListItem>

                            <ListItem button onClick={() => navigateTo('/order/history')}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary='My orders' />
                            </ListItem>
                        </>
                    )}

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText
                            primary='Men'
                            onClick={() => navigateTo('/category/men')}
                        />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText
                            primary='Women'
                            onClick={() => navigateTo('/category/women')}
                        />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText
                            primary='Kids'
                            onClick={() => navigateTo('/category/kid')}
                        />
                    </ListItem>
                    
                    {
                        !isLoggedIn
                            ? (
                                <ListItem button onClick={() => navigateTo(`/auth/login?p=${ router.asPath }`)}>
                                    <ListItemIcon>
                                        <VpnKeyOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary='Enter' />
                                </ListItem>

                            ) : (
                                <ListItem button onClick={ logoutUser }>
                                    <ListItemIcon>
                                        <LoginOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary='Exit' />
                                </ListItem>
                            )
                    }

                    {/* Admin */}
                    { user?.role === 'admin' && isLoggedIn && (
                        <><Divider />
                        <ListSubheader>Admin Panel</ListSubheader>
    
                        <ListItem button onClick={() => navigateTo('/admin')}>
                            <ListItemIcon>
                                <DashboardOutlined />
                            </ListItemIcon>
                            <ListItemText primary='Dasboard' />
                        </ListItem>

                        <ListItem button onClick={() => navigateTo('/admin/products')}>
                            <ListItemIcon>
                                <CategoryOutlined/>
                            </ListItemIcon>
                            <ListItemText primary='Products' />
                        </ListItem>
    
                        <ListItem button onClick={ () => navigateTo('/admin/orders') }>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined/>
                            </ListItemIcon>
                            <ListItemText primary='Orders' />
                        </ListItem>
    
                        <ListItem button onClick={() => navigateTo('/admin/users')}>
                            <ListItemIcon>
                                <AdminPanelSettings/>
                            </ListItemIcon>
                            <ListItemText primary='Users' />
                        </ListItem></> 
                    )}
                </List>
            </Box>
        </Drawer>
    )
}