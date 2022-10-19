import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center' underline='none'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ml: 0.5}}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex='1'/>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href='/category/men'>
                        <Link underline='none'>
                            <Button>
                                Men
                            </Button>
                        </Link>
                    </NextLink>
                    
                    <NextLink href='/category/women'>
                        <Link underline='none'>
                            <Button>
                                Women
                            </Button>
                        </Link>
                    </NextLink>
                
                    <NextLink href='/category/kids'>
                        <Link underline='none'>
                            <Button>
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

                <Button sx={{ml: 2}}>
                    Menu
                </Button>

            </Toolbar>
        </AppBar>
    )
}
