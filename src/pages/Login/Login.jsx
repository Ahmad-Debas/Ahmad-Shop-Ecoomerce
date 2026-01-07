import React, { useState } from 'react'
import { 
  Box, 
  Alert,
  AlertTitle,
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  InputAdornment, 
  IconButton, 
  Link,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link as RouterLink } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from '../../Validation/LoginSchema.js';

export default function Login() {
  
  const [servermessage,setServerMessage] = useState('');
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver : yupResolver(LoginSchema),
    mode:"onBlur",
  });
  const handleLogin = async (value)=>{
    console.log(value);
   
    
    try{
      const response = await axios.post("https://knowledgeshop.runasp.net/api/Auth/Account/Login",value);
        console.log(response.data.accessToken);
        localStorage.setItem('token',response.data.accessToken);
         setServerMessage('');
    }
    catch(err){
    console.log("STATUS:", err?.response?.status);
    console.log("ERROR DATA:", err?.response?.data);
    console.log("ERROR HEADERS:", err?.response?.headers);
    // setServerRrrors(err.response?.data.errors);
    setServerMessage(err.response?.data.message);
    }
  }
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        background: 'linear-gradient(135deg, #040404ff 0%, #ffffffff 100%)' // خلفية متدرجة جذابة
      }}
    >
      <Container  maxWidth="xs">
        <Paper 
          elevation={10} 
          sx={{ 
            padding: 4, 
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3
          }}
        >
          {/* الأيقونة العلوية */}
          {servermessage ?  <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            <AlertTitle>خطأ</AlertTitle>
            {servermessage}
          </Alert> : null }
          {/* {servermessage&& (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            <AlertTitle>خطأ</AlertTitle>
            {servermessage}
          </Alert> */}
          {/* )} */}

          <Box sx={{  m: 1, bgcolor: 'primary.main', p: 1.5, borderRadius: '50%', color: 'white' }}>
            <LockOutlined />
          </Box>

          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          تسجيل الدخول علي باشا
          </Typography>

          <Box component="form" onSubmit={handleSubmit(handleLogin)}  noValidate sx={{ mt: 1, width: '100%' }}>
            {/* حقل الإيميل */}
            <TextField
              margin="normal"
              fullWidth
              {...register('email')}
              id="email"
              label="البريد الإلكتروني"
              autoComplete="email"
              autoFocus
              error = {errors.email}
              helperText = {errors.email?.message}

            />

            {/* حقل كلمة المرور */}
            <TextField
              margin="normal"
              fullWidth
              label="كلمة المرور"
             {...register('password')}
             error = {errors.password}
              helperText = {errors.password?.message}
              id="password"
              autoComplete="current-password"
             
              />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
            >
             Login
            </Button>
          </Box>

          <Link component={RouterLink} to='/forget-password' underline='none' color='inherit' > هل نسيت كلمة السر؟إضغط هناا</Link>
        </Paper>
      </Container>
    </Box>
  );
  
}
