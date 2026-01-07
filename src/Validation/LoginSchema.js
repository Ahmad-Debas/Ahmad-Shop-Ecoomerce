
import * as yup from 'yup';
 let LoginSchema = yup.object({
    email: yup.string().email('invalid email').required('Email is reqiured.'),
    password : yup.string().required('Password is reqiured').min(8,"password must be at least 8 chracters").
       matches(/[A-Z]/,"Must at least contain 1 Uppercase letter.")
      .matches(/[a-z]/,"Must contain at least one lowercase letter.")
      .matches(/\d/,"Must at least contain one number.")
      .matches(/[@#*$!?]/,"Must at least one special character."),
}) ;

export default LoginSchema;
