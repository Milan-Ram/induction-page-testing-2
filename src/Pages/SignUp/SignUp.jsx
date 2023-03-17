import React from "react";
import "./signUp.css";
import astronaut from "../../Images/astronaut.avif";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useFormik } from 'react';
// import { signUpSchema } from "../schemas";

// ****************************************************************************************
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ****************************************************************************************
// const initialValues = {
  //   name: "",
//   email: "",
//   phone: "",
//   branch: "",
//   preference_1: "",
//   preference_2: "",
// };

const SignUp = () => {
  // const { handleSubmit } = useFormik({
  //   validationSchema: signUpSchema,
  //   onSubmit: (values, action) => {
  //     console.log(values);
  //     action.resetForm()
  //   },
  // })
  // ****************************************************************************************
  const validationSchema = object().shape({
    name: string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: string().required('Email is required').email('Invalid email address'),
    contact: string()
      .required('Phone number is required')
      .min(10, 'Enter valid contact number'),
    branch: string()
      .required('Enter your branch'),
    regdno: string()
      .required('Registration number is required')
      .min(10, 'Enter valid registration number'),
      select:string()
      .required('select your domain'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  // ****************************************************************************************


  const navigate = useNavigate();
  const [dom1, setDom1] = useState("");
  const [dom2, setDom2] = useState("");
  const [user, setUser] = useState({
    name: "", email: "", contact: "", branch: "", regdno: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
    console.log(user);
  }
  const option1 = (e) => {
    setDom1(e.target.value);
    console.log(dom1);
  }
  const option2 = (e) => {
    setDom2(e.target.value);
    console.log(dom2);
  }

  const Login = () => {
    const gettoken = window.localStorage.getItem("userToken");
    console.log(gettoken);
    if (gettoken)
      window.location.href = "./ProfilePage";
    else
      window.location.href = "./signInPage";
  }

  const postRegister = async (e) => {
    // e.preventDefault();
    localStorage.clear();
    // let userData = [];
    const { name, email, contact, branch, regdno } = user;
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, contact, branch, regdno, pref1: dom1, pref2: dom2
      })
    })

    const data = await res.json();

    console.log(data.message);
    alert(`${data.message}`);
    if (data.status === 201) {
      console.log("fuck");
      navigate("/signInPage");
    }
    console.log(data);
    console.log(dom1);
    console.log(dom2);
    // console.log(password)
    // console.log(data);
    // if (data.status == "ok") {
    //   alert(`Login Successful`);
    //   window.localStorage.setItem("token", data.data);
    //   window.localStorage.setItem("email", email);
    //   window.localStorage.setItem("site", "freelancer");
    //   history.push("/createWorkspace");
    //   window.location.href = "./createWorkspace"
    // }
    // else if (data.status == "error")
    //   alert(data.message);
    // else alert("error logging in!");
  }
  return (
    <>
      <div className="signUp-page-container d-flex">
        <div className="signUp-page-wrapper">
          <div className="signUp-page-img">
            <img src={astronaut} alt="" />
          </div>
          <form onSubmit={handleSubmit(postRegister)} className="signUp-form">
            <h2>Idea Innovation Cell</h2>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" {...register('name')} name="name" id="Name" value={user.name} onChange={handleInput} placeholder="Enter your Name" autoComplete="off" />
              {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" {...register('email')} name="email" value={user.email} id="email" onChange={handleInput} placeholder="Enter your Email" autoComplete="off" />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="grid-two-col">
              <div>
              <label htmlFor="Phone Number">Phone-Number</label>
              <input type="number"  {...register('contact')} name="contact" onChange={handleInput} value={user.contact} id="Phone-Number" placeholder="Phone Number" autoComplete="off" />
              {errors.contact && (
            <p className="error-message">{errors.contact.message}</p>
          )}
          </div>
           <div>
              <label htmlFor="regdno">Registration No:</label>
              <input type="number" {...register('regdno')}  name="regdno" onChange={handleInput} value={user.regdno} id="Phone-Number" placeholder="Registration Number" autoComplete="off" />
              {errors.regdno && (
            <p className="error-message">{errors.regdno.message}</p>
          )}
            </div>
            </div>
            <div>
              <label htmlFor="branch">Branch</label>
              <input type="text" {...register('branch')}  name="branch" id="branch" onChange={handleInput} value={user.branch} placeholder="Enter your Branch" autoComplete="off" />
              {errors.branch && (
            <p className="error-message">{errors.branch.message}</p>
          )}
            </div>
            {/* <div className="phone-container grid-two-col">
              <label htmlFor="regdno">Registration No:</label>
              <input type="number" name="regdno" onChange={handleInput} value={user.regdno} id="Phone-Number" placeholder="Registration Number" autoComplete="off" />
              {errors.regdno && (
            <p className="error-message">{errors.regdno.message}</p>
          )}
            </div> */}
            <div className="grid-two-col">
             <div> <label htmlFor="preference-1" > Select Your Domain Preference 1</label>
              <select name="preference-1" {...register('select')}   onChange={option1} id="preference-1" >
              <option disabled></option>
                {/* <option value="Preference 1" name="pref1">Preference 1</option> */}
                <option value="Cs-Electronics" name="pref1">Cs-Electronics</option>
                <option value="Chemical" name="pref1">Chemical</option>
                <option value="Mechanical" name="pref1">Mechanical</option>
                <option value="Management" name="pref1">Management</option>
              </select>
              </div>
              <div>
              <label htmlFor="preference-2" > Select Your Domain Preference 2</label>
              <select name="preference-2" onChange={option2} id="preference-2" >
              <option disabled></option>
                {/* <option value="Preference 2" name="pref2">Preference </option> */}
                <option value="Cs-Electronics" name="pref2">Cs-Electronics</option>
                <option value="Chemical" name="pref2">Chemical</option>
                <option value="Mechanical" name="pref2">Mechanical</option>
                <option value="Management" name="pref2">Management</option>
              </select>
              </div>
              {errors.select && (
            <p className="error-message">{errors.select.message}</p>
          )}
            </div>
            <div className="bottom-container grid-two-col">
              <p>Registered already ? <Link onClick={Login} className="signIn-text">Sign In</Link></p>
            </div>
            <input className="sign-up-btn" type="submit" value="Sign Up"/>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
