import * as yup from "yup";


let RegisterScehma = yup.object({
   userName: yup.string().required("User Name is required.").matches(/^[a-zA-Z0-9._-]+$/,"Invalid User name."),
   fullName: yup.string().required('Full name must be reqiured'),
   email: yup.string().email('Email is invalid').required('Email is required'),
   password : yup.string().required('Password is reqiured').min(8,"password must be at least 8 chracters").
   matches(/[A-Z]/,"Must at least contain 1 Uppercase letter.")
  .matches(/[a-z]/,"Must contain at least one lowercase letter.")
  .matches(/\d/,"Must at least contain one number.")
  .matches(/[@#*$!?]/,"Must at least one special character."),
  phoneNumber :yup.string().required("Phone number is required."),
});

export default RegisterScehma;