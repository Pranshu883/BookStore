import { Navigate, useNavigate } from "react-router-dom";
import { Button, Box, Modal, Typography} from "@mui/material";
import { useContext, useState } from "react";
import { lightBlue } from "@mui/material/colors";
import { FormHelperText,TextField } from "@mui/material";
import {Formik, Form,  ErrorMessage} from "formik";
import * as Yup from "yup";
import authServices from "./services/authServices";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { AuthContext } from "./context/authContext";



export const Apple = () => {


// const [open, setOpen] = useState(false);
// const [userName, setUserName] = useState("pranshu");
    const navigate = useNavigate();

    const userContext = useContext(AuthContext);

    const validationSchema = Yup.object().shape({

       
        Password: Yup.string().min(8).required("Password should not be empty"),
        Email: Yup.string().email().required("Email should not be empty"),

    });
    const handleSubmit = async(values) => {

        const payload = {
            email: values.Email,
            password: values.Password,
        }

        await authServices.Login(payload).then(response =>{
            if(response && response.status===200)
            {
                toast.success("User logged in successfully !!",{position:"bottom-right"});
                navigate("/bookList");
                userContext.setUser(response.data.result);
            }
        })
        .catch((error)=>{
            console.log("this one",error);
            toast.error("Unable to login",{position:"bottom-right"})
        })
    };

    return (
        <div className="page" id="apple">

        <div style={{margin:"auto", border:"1px solid teal",
        padding:6,
        backgroundColor:"lightBlue",
        borderRadius:"2px",
        fontWeight:"500" }}> Login </div> 
        <Formik initialValues={{ Email:"", Password:""}}

        validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}>

            {({ values,errors, setFieldValue ,handleBlur })=>{
                
                
            return( 
                <Form>
                        
                    <TextField 
                            id="outlined-basic" 
                            label="Email address *" 
                            name="Email"
                            variant="outlined" 
                            value={values.Email}
                            onChange={ (e)=>{setFieldValue("Email",e.target.value)}}
                            onBlur={handleBlur} />

                        <FormHelperText error>
                            <ErrorMessage name ="Email"/>
                        </FormHelperText>

                    <TextField 
                            id="outlined-basic" 
                            label="Password *" 
                            name="Password"
                            variant="outlined"
                            value={ values.Password}
                            onChange={ (e)=>{setFieldValue("Password",e.target.value)}}
                            onBlur={handleBlur} />

                        <FormHelperText error>
                            <ErrorMessage name ="Password"/>
                        </FormHelperText>
                    <Button variant="contained" type="submit" >Submit</Button>
                </Form>)
            }}
        </Formik>
        </div>);
};
