import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name:Yup.string().min(4).max(30).required("Please enter your name"),
    email:Yup.string().email().required("Please enter your email"),
    phone:Yup.number().required("enter your phone number"),
    branch:Yup.string().required("enter your branch"),
    // preference_1:Yup.string().required("select at least one preference")
})