import { Label } from '@mui/icons-material'
import { Box, Container, Paper, TextField, Typography , Button} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import VerifyEmailSchema from '../../Validation/VerifyEmail.js';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SendCode from '../SendCode/SendCode.jsx';

export default function VerifyEmail() {

  const navigate = useNavigate();
    const [serverMessage, setServerMessage] = useState('');
    const [serverMessagesuccess, setServerMessageSuccess] = useState('');
    const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({
      resolver : yupResolver(VerifyEmailSchema),
      mode:'onBlur'
    });
    const handleForm   = async (value)=>{
       console.log(value);
       try{
         const response = await axios.post("https://knowledgeshop.runasp.net/api/Auth/Account/SendCode",value);
         console.log('status',response.status);
         console.log('server',response.data) 
         if(response.data.success === true)
             localStorage.setItem('email',value.email)

         setServerMessageSuccess(response.data.message)
         navigate('/send-code' , {state:value.email});
       }
       catch(err){
          console.log("STATUS:", err?.response?.status);
          console.log("ERROR DATA:", err?.response?.data);
          console.log("ERROR HEADERS:", err?.response?.headers);
          setServerMessage(err.response.data.message);
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
        {serverMessage &&(
          <Typography color='red'> {serverMessage} </Typography>
        )}
        {serverMessagesuccess &&(
          <Typography color='green'> {serverMessagesuccess} </Typography>
        )}
      <Typography > Enter Your Email To Complete  </Typography>
      <Box component="form"   onSubmit={handleSubmit(handleForm)}  sx={{display:'flex' ,  width: '100%', flexDirection: 'column' ,alignItems:'center'}}>
          <TextField
                margin="normal"
                fullWidth
                {...register('email')}
                id="email"
                label="البريد الإلكتروني"
                email
                autoFocus
                error = {errors.email}
                helperText = {errors.email?.message}
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
