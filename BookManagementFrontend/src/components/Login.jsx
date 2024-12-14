import React, { useContext, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthProvider'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/

export const Login = () => {
    const userRef=useRef()
    const errorRef=useRef()
    const [userName,setUserName]=React.useState("")
    const [password,setPassowrd]=React.useState("")
    const [error,setError]=React.useState("")
    const [isLogin,setIsLogin]=React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [validName, setValidName] = React.useState(false)
    const {setAuth}=useContext(AuthContext)
    const auth=useContext(AuthContext)
    const navigate=useNavigate();
    const location=useLocation();
   const from=location.state?.from?.pathname||"/";

    useEffect(()=>{
        console.log('First useEffcet fired.UseRef is set')
        userRef.current.focus()
    },[])

    useEffect(()=>{
        const result = USER_REGEX.test(userName)
    console.log("result of username valid :" + result)
    setValidName(result)
        console.log("Second useEffect fired .Useref is set...")
        setError('')
    },[userName,password])

    const loginUser=(e)=>{
        console.log("loginuser function called..")
        e.preventDefault();
        console.log("prevent default behaviour of form submission..")
        const role="EMPLOYEE"
        const userLoginObj={"username":userName,"password":password,"role":role}
        AuthService.loginUser(userLoginObj).then(
          (response)=>{
            console.log(JSON.stringify(response.data))
            console.log("username="+response.data.username)
            console.log("token="+response.data.token)
            console.log("role="+response.data.role)
            
            setSuccess(true)
            console.log("Success message set to true...")
            //navigate('/login')
            setAuth({
                "username":response.data.username,
                "token":response.data.token,
                 "role":response.data.role
            })
            localStorage.setItem('token', response.data.token);
            // (from === '/') ? navigate('/display') : navigate(from, { replace: true })
 
            navigate(from,{replace:true})
            //navigate('/display')
            // console.log("auth="+auth)
            console.log("Auth context variable is with values for username ,token and role"+JSON.stringify(auth))
          
        }).catch((error)=>{
           console.log("error from login api "+error.response)
           if(!error?.response){
            setError("No server response")
           }
           else if (error.response?.status===500){
            setError("Bad Credentials")
           }
           else{
            setError("Login failed")
           }
        })
      }
  return (
    <div id="background">
        <section>
            <p ref={errorRef} className={error?'errmsg':'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <h1>Sign In</h1>
            <form>
                {/* USERNAME */}
                <label htmlFor="userName"> userName</label>
                <span className={validName&&userName?"valid":"hide"}>
            <FontAwesomeIcon icon={faCheck}/>
           </span>
          <span className={validName||!userName?"hide":"invalid"}>
          <FontAwesomeIcon icon={faTimes}/>
          </span>
                <input 
                type="text"
                id="userName"
                ref={userRef}
                autoComplete='off'
                onChange={(e)=>{console.log("state variable userName set with value"+e.target.value)
                    setUserName(e.target.value)
                }}
                value={userName} required/>

                {/* PASSWORD */}

                <label htmlFor="password"> Password</label>
                <input 
                type="password"
                id="password"
                onChange={(e)=>{console.log("state variable password set with value"+e.target.value)
                    setPassowrd(e.target.value)
                }}
                value={password} required/>
                <button 
          onClick={(e) => { loginUser(e) }}>
          Login
        </button>
                <p>Need an account?</p>
                <span className='line'>
                    <a href="/registration" >Sign UP</a>
                    {/* <Link to="/register/"/> */}
                </span>
            </form>
        </section>

    </div>
  )
}

