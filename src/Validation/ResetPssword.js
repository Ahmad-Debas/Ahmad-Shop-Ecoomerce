import * as yup from "yup";

const ResetPassSchema = yup.object({
    newPassword:  yup.string().required('New Password is reqiured').min(8,"password must be at least 8 chracters").
       matches(/[A-Z]/,"Must at least contain 1 Uppercase letter.")
      .matches(/[a-z]/,"Must contain at least one lowercase letter.")
      .matches(/\d/,"Must at least contain one number.")
      .matches(/[@#*$!?]/,"Must at least one special character."),
    code: yup.string().required('code is reqiured.')
})

export default ResetPassSchema;