import logo from './logo.svg';
import { Route, Routes, BrowserRouter, Link, Navigate} from "react-router-dom";
import './App.css';
import {Home} from './Home';
import {Apple} from './Apple';
import { NotFound } from './NotFound';
import {Form1} from './Form';
import logo192 from './design/logo192.png';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { createContext, useContext } from 'react';
import AuthWrapper, { AuthContext, useAuthContext } from './context/authContext';
import Cookies from 'js-cookie';
import { BookList } from './BookList';


function App() {

  const theme = createTheme({

    components: {

      MuiButton:{
        styleOverrides: {
          root: {
            backgroundColor: "green",
          }
        },
      },
      MuiTextField:{
        styleOverrides: {
          root:{
            
          }
        }
      }
    },

  })

  const userContext = useAuthContext();

  // const data = Cookies.get("userInfo");
  console.log(userContext);

  return (

  <ThemeProvider theme={theme}> 
  <BrowserRouter>
  
  <AuthWrapper>
   

   <ToastContainer/>
  
   
    <div className='nav'>
      
      <div className='img' > <img src="http://localhost:3000/logo192.png" height="40px"></img></div>
      <Link className='link' to="/home"> 🏠Home </Link>
      <Link className='link' to="/bookList"> 📕Book List </Link>
      <Link className='link' to="/"> Login </Link>
      <Link className='link' to="/form"> Form </Link>
      <Link className='link' to="/test"> Not available</Link>


    </div>
   
    <Routes>

      <Route path="/" element={<Apple/>} />
      <Route path="/bookList" element={<BookList/>}/>
      <Route exact path="/home" element={userContext.user.email? <Home/> : <Navigate to={"/"}/> }/>
      <Route path="*" element ={<NotFound/>} />
      <Route path="/form" element={<Form1/>} />
      
    </Routes>
      
  

   </AuthWrapper> 
   
   </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
