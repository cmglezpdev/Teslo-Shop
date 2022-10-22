import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Badge, Box, Button, IconButton, Input, Link, Toolbar, Typography, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { CartContext, UIContext } from '../../context';

export const Navbar = () => {

    const { toggleSideMenu } = useContext(UIContext);
    const { summary } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const router = useRouter();
    const { gender } = router.query;


    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        router.push(`/search/${ searchTerm }`);
    }

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ml: 0.5}}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex='1'/>

                <Box 
                    className='fadeIn'
                    sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                >
                    <NextLink href='/category/men'>
                        <Link>
                            <Button 
                                color={gender === 'men' ? 'primary' : 'info'}
                                sx={{ mr: 1 }}
                            >
                                Men
                            </Button>
                        </Link>
                    </NextLink>
                    
                    <NextLink href='/category/women'>
                        <Link>
                            <Button 
                                color={gender === 'women' ? 'primary' : 'info'}
                                sx={{ mr: 1 }}
                            >
                                Women
                            </Button>
                        </Link>
                    </NextLink>
                
                    <NextLink href='/category/kid'>
                        <Link>
                            <Button 
                                color={gender === 'kid' ? 'primary' : 'info'}
                                sx={{ mr: 1}}
                            >
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex='1'/>

                {
                    isSearchVisible
                        ? (
                            <Input
                                className='fadeIn'
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                autoFocus
                                type='text'
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                           onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ) : (
                            // large screens 
                            <IconButton
                                className='fadeIn'
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                onClick={() => setIsSearchVisible(true)}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }

                {/* small sreens */}
                 <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                 >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ summary.numberOfProducts > 9 ? '+9' : summary.numberOfProducts } color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button 
                    variant='text' 
                    sx={{ml: 2}}
                    onClick={() => toggleSideMenu()}
                >
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
