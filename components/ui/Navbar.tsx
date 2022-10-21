import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

export const Navbar = () => {

    const router = useRouter();
    const { gender } = router.query;

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

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button variant='text' sx={{ml: 2}}>
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
