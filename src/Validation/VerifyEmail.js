import * as yup from "yup";


const VerifyEmailSchema = yup.object({
    email: yup.string().email('Email is invalid').required('Email is Reqiured.')
})

export default VerifyEmailSchema