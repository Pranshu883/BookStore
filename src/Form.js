import React, { useState } from "react";
import { FormHelperText, Typography } from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {Formik, Form,  ErrorMessage} from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify';
import axios from 'axios';
import authServices from "./services/authServices";

export const Form1 = () => {
    const [username, setUserName] = useState("pasm");
    const [password, setPassword] = useState("asad");

    const validationSchema = Yup.object().shape({

            UserName: Yup.string().required("User Name should not be empty"),
            Password: Yup.string().min(8).required("Password should not be empty"),
            Age: Yup.number().min(18).required("Age should not be empty"),
            Email: Yup.string().email().required("Email should not be empty"),

        });
   
    const handleSubmit = async(values) =>{

        const payload = {
            firstName : values.UserName,
            lastName : "test",
            email : values.Email,
            roleId : 2,
            password : values.Password,
        };

    // axios
    //     .post("https://book-e-sell-node-api.vercel.app/api/user",payload)
    //     .then((response) => {
    //         if(response && response.code === 200){
    //             toast("Data submitted successfully ");
    //         }
    //     })
    //     .catch((error) => {
    //         toast("unable to submit data");
    //     });

         await authServices
                .Register(payload)
                .then(response => {
                    if(response && response.status === 200){
                        toast.success("Data submitted successfully ");
                    }
                })
                .catch((error) => {
                    toast.error("unable to submit data");
                });

    };


    return (

        <Formik initialValues={{UserName:"", Age:"", Email:"", Password:""}}

        validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}>

            {({ values,errors, setFieldValue ,handleBlur })=>{
                
                console.log("errors  :",errors);
                return( 
                <Form>     
                
                    
                    <div className="form">
                        <Typography variant="h4">Register Here!</Typography>
                    <TextField 
                            id="outlined-basic" 
                            label="UserName" 
                            name="UserName"
                            error = {errors.UserName}
                            onBlur={handleBlur}
                            variant="outlined" 
                            value={values.UserName}
                            onChange={ (e)=>{setFieldValue("UserName",e.target.value)}} />

                        <FormHelperText error>
                            <ErrorMessage name ="UserName"/>
                        </FormHelperText>

                     <TextField 
                            id="outlined-basic" 
                            label="Age" 
                            name="Age"
                            variant="outlined" 
                            value={values.Age}
                            onChange={ (e)=>{setFieldValue("Age",e.target.value)}} />

                        <FormHelperText error>
                            <ErrorMessage name ="Age"/>
                        </FormHelperText>

                    <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            name="Email"
                            variant="outlined" 
                            value={values.Email}
                            onChange={ (e)=>{setFieldValue("Email",e.target.value)}} />

                        <FormHelperText error>
                            <ErrorMessage name ="Email"/>
                        </FormHelperText>

                    <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            name="Password"
                            variant="outlined"
                            value={ values.Password}
                            onChange={ (e)=>{setFieldValue("Password",e.target.value)}} />

                        <FormHelperText error>
                            <ErrorMessage name ="Password"/>
                        </FormHelperText>
                    <Button variant="contained" type="submit" >Submit</Button>
                    </div>
                </Form>)
            }}
        </Formik>
    );
};