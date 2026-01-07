import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ResetPassSchema from '../../Validation/ResetPssword.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Paper, TextField, Typography , Button} from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SendCode() {

    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({
      resolver : yupResolver(ResetPassSchema),
      mode:'onBlur'
    });

    const navigate = useNavigate();

    const [ServerErrors,setServerErrors] = useState("");
      
    const handleForm = async (value)=>{
        console.log(value)
       value.email = localStorage.getItem('email');
        try{
        const response = await axios.patch("https://knowledgeshop.runasp.net/api/Auth/Account/ResetPassword",value); 
        console.log('status',response.status);
        console.log('server data',response.data);
        setServerErrors("");
        navigate('/login');
        }
         catch(err){
         console.log("STATUS:", err?.response?.status);
         console.log("ERROR DATA:", err?.response?.data);
         console.log("ERROR HEADERS:", err?.response?.headers);
         setServerErrors(err.response.data.message)
            // setServerRrrors(err.response?.data.errors);
            // setServerMessage(err.response?.data.message);
            }
        
    }
  return (
   <Box sx={{ 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    background: 'linear-gradient(135deg, #040404ff 0%, #ffffffff 100%)', // خلفية متدرجة جذابة
    paddingTop: '100px',           
    height:'100vh'}}>

    <Container  >
      <Paper elevation={10}  sx={{ marginLeft:'300px' , borderRadius:'50px' , width:'50%' , display :'flex' , flexDirection: 'column' , justifyContent:'center' , alignItems:'center',padding: 9 }}>
      
      <Typography >Reset Password  </Typography>
      {setServerErrors &&(
        <Typography color='red'> {ServerErrors}  </Typography>
      )}
      <Box component="form"   onSubmit={handleSubmit(handleForm)}  sx={{display:'flex' ,  width: '100%', flexDirection: 'column' ,alignItems:'center'}}>
          <TextField
                margin="normal"
                fullWidth
                {...register('code')}
                id="code"
                label="رمز التحقق."
                email
                autoFocus
                error = {errors.code}
                helperText = {errors.code?.message}
         />

         <TextField
                margin="normal"
                fullWidth
                {...register('newPassword')}
                id="email"
                label="كلمة المرور الجديدة"
                email
                autoFocus
                error = {errors.newPassword}
                helperText = {errors.newPassword?.message}
         />
           <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold'}}
            >
             Send
            </Button>

      </Box>

      </Paper>
      
     
    </Container>
     

   </Box>
  )
}
