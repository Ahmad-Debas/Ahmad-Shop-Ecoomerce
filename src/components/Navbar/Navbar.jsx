import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

//  <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
export default function Navbar() {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#030303ff'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ali Pasha Market
          </Typography>

          <Box sx={{display:'flex',gap:2}} >
            <Link component={LinkRouter} to='/home' sx={{color:'inherit'}} underline='none'> Home </Link>
            <Link component={LinkRouter} to='/cart' sx={{color:'inherit'}} underline='none'> Cart </Link>
            <Link component={LinkRouter} to='/login'sx={{color:'inherit'}} underline='none'> Login </Link>
            <Link component={LinkRouter} to='/register' sx={{color:'inherit'}} underline='none'> Register </Link>
          </Box >
        </Toolbar>
      </AppBar>
    </Box>
  )
}
