import Cookies from "js-cookie";
import React, { createContext, useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialUserValues = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};

 const initialState ={
    setUser: () => {},
    user: initialUserValues,
    signOut: () =>{},
 };

export const AuthContext = createContext(initialState);

const AuthWrapper = ({ children }) => {

    const [userData, setUserData] = useState(initialUserValues);
    const navigate = useNavigate();

    const setUser = (data) => {

        // console.log("data !!!!", data);
        localStorage.setItem("userInfo",JSON.stringify(data));
        setUserData(data);
    };

    const signOut = () =>{
        setUserData(initialUserValues);
        localStorage.removeItem("userInfo");
        
        navigate("/Apple");
    };
 
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("userInfo")) || initialUserValues;
       
        if(!data.email){
            navigate("/");
        }
        setUserData(data);
    }, []);

    let value = {
       user : userData, 
       setUser,
       signOut,
    };

    return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};

export default AuthWrapper;

export const useAuthContext = () => {
    return useContext(AuthContext);
}