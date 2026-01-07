import { Button, Box, TextField, Typography , Container ,Paper } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import RegisterScehma  from '../../Validation/RegisterSchema.js';



export default function Register() {



 const [serverErrors,setServerErrors] = useState([]);
  const {register , handleSubmit , formState:{errors}}= useForm({
    resolver: yupResolver(RegisterScehma),
     mode:"onBlur"
  });
  const handleRegister = async (values)=>{
    try {
    console.log(values);
    const res = await axios.post(
      "https://knowledgeshop.runasp.net/api/Auth/Account/Register",
      values,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.log("STATUS:", err?.response?.status);
    console.log("ERROR DATA:", err?.response?.data); // ده أهم حاجة
    console.log("ERROR HEADERS:", err?.response?.headers);
    setServerErrors(err.response.data.errors)
  }
   
  }
return (
    // استخدام Box لتغطية كامل الشاشة بالـ Gradient
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #131010ff 0%, #f9f5f5ff 100%)', // تعديل التدرج ليصبح أجمل
      padding: 3
    }}>
      <Container maxWidth="sm">
        {/* Paper بيعطي خلفية بيضاء وشكل الكارت للفورم */}
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
               
          <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
            Register Page
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleSubmit(handleRegister, (err) => console.log("Validation Errors:", err))} 
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5, // مسافات متناسقة
            }} 
          >
            {serverErrors?.length> 0 ?
                serverErrors.map((err)=>{
                  return <Typography sx={{color:'red'}}>{err}</Typography>
                })
            :null}  
            <TextField
              {...register('userName')}
              label="User Name"
              variant="outlined" // الـ Outlined غالباً أجمل في الـ Register
              fullWidth
              error={!!errors.userName} // تحويل الكائن لـ Boolean
              helperText={errors.userName?.message}
            />

            <TextField
              {...register('fullName')}
              label="Full Name"
              fullWidth
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField
              {...register('email')}
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              {...register('password')}
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              {...register('phoneNumber')}
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />

            <Button 
              variant="contained" 
              size="large"
              type='submit'
              sx={{ 
                mt: 2, 
                py: 1.5, 
                textTransform: 'none', 
                fontSize: '1.1rem',
                backgroundColor: '#1a1a1a',
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
