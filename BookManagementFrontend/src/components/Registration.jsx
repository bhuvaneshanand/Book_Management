import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'
import './Registration.css'
import AuthService from '../services/AuthService';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!=.*!@#$%]).{8,24}$/;
export const Registration = () => {

    //allows to focus on error user input
    const userNameRef = useRef();
    //allows to focus on error
    const errorRef = useRef();
    //username textbox
    const [userName, setUsername] = useState('')
    //valid username regex result
    const [validName, setValidName] = useState(false)
    //focusing on username textbox
    const [userNameFocus, setUserNameFocus] = useState(false)

    const [role, setRole] = useState('')
    const [validRole, setValidRole] = useState(false)
    const [roleFocus, setRoleFocus] = useState(false)

    //password textbox
    const [password, setPassword] = useState('')
    //valid password regex result
    const [validPassword, setValidPassword] = useState(false)
    //focusing on password textbox
    const [passwordFocus, setPasswordFocus] = useState(false)
    //confirmPassword textbox
    const [confirmPassword, setConfirmPassword] = useState('')
    //result of match between password and confirm password
    const [validMatch, setValidMatch] = useState(false)
    //focusing on password textbox
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
    //error message
    const [error, setError] = useState('')
    //success message
    const [success, setSucccess] = useState(false)

    useEffect(() => {
        console.log("First useEffect fired")
        userNameRef.current.focus();
        console.log("First useEffect fired...Userref set focus .....")

    }, [])

    useEffect(() => {
        console.log("Second useEffect fired beacuse of intitial mount or userName state variable changed...")

        const result = USER_REGEX.test(userName)
        console.log("Result of username valid :" + result)

        setValidName(result)
        console.log("State variable validName assigned with result of regex :" + result)

    }, [userName])
    
    useEffect(() => {
        console.log("Role useEffect fired ")


    }, [role])

    useEffect(() => {
        console.log("Third useEffect fired beacuse of intitial mount or password/matchPwd state variables changed...")

        const result = PWD_REGEX.test(password)
        console.log("Result of password valid :" + result)

        setValidPassword(result)
        console.log("State variable validPassword assigned with result of regex :" + result)

        const matchResult = password === confirmPassword
        setValidMatch(matchResult)
        console.log("State variable validMatch assigned with result of match btwn pwd & confirmpwd :" + matchResult)

    }, [password, confirmPassword])

    useEffect(() => {
        console.log("Fourth useEffect fired beacuse of intitial mount or user,password,confirmPassword state variable changed...")

        setError('')
        console.log("status variable error set with empty string")

    }, [userName, password, confirmPassword])

    const saveUserRegistration = (e) => {
        console.log("saveUserRegistration function called...")
        e.preventDefault()
        console.log("Prevent default behaviour of form submission.....")
        const email = 'bhuvaneshanand1970@gmail.com'
        const userRegistrationObj = { "username": userName, "password": password, "role": role }
        AuthService.registerUser(userRegistrationObj).then(
            (response) => {
                console.log(JSON.stringify(response.data))
                setSucccess(true)
                console.log("Success message set to true.........")

            }
        ).catch((error) => {
            console.log("error from register api" + JSON.stringify(error))
            if (!error?.response) {
                setError("No server Response")
            }
            else if (error.response?.status === 409) {
                setError("UserName Taken")
            }
            else {
                setError("Registration failed")
            }
        })
    }
    
    return (
        <div id='background'>
            <section>
                <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'} aria-live='assertive'>{MediaError}</p>
                <h1>Register User</h1>
                <form>
                    {/* USERNAME */}
                    <label htmlFor='username'>Username
                        <span className={validName ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !userName ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>

                    <input type='text'
                        id='username'
                        value={userName}
                        ref={userNameRef}
                        autoComplete='off'
                        onChange={(e) => { setUsername(e.target.value) }}
                        required aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => { setUserNameFocus(true) }}
                        onBlur={() => { setUserNameFocus(false) }}
                    />

                    <p id='uidnote' className={userNameFocus && userName && !validName ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 chars<br />
                        Must begin with letter<br />
                        Letters,Numbers,Underscores, Hypen allowed
                    </p>
                    {/* ROLE */}
                    <label htmlFor='role'>Role
                        <span className={validRole ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        {/* <span className={validRole || !role ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> */}
                    </label>

                    <input type='text'
                        id='role'
                        value={role}
                        ref={userNameRef}
                        autoComplete='off'
                        onChange={(e) => { setRole(e.target.value) }}
                        required aria-invalid={validRole ? 'false' : 'true'}
                        aria-describedby='uidnote'
                        onFocus={() => { setRoleFocus(true) }}
                        onBlur={() => { setRoleFocus(false) }}
                    />

                    <p id='uidnote' className={userNameFocus && userName && !validName ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 chars<br />
                        Must begin with letter<br />
                        Letters,Numbers,Underscores, Hypen allowed
                    </p>

                    {/* PASSWORD */}
                    <label htmlFor='password'>Password
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? 'hide' : 'invalid'} />
                    </label>
                    <input type="password"
                        id='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required aria-invalid={validPassword ? 'false' : 'true'}
                        aria-describedby='pwdnote'
                        onFocus={() => { setPasswordFocus(true) }}
                        onBlur={() => { setPasswordFocus(false) }}
                    />
                    <p id='pwdnote' className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 charaters<br />
                        Must include uppercase & lowercase letters, a number and special symbol<br />
                        Allowed special charaters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar Sign">$</span>
                        <span aria-label="percent">%</span>
                    </p>

                    {/* CONFIRM PASSWORD */}
                    <label htmlFor='confirm-pwd'>Confirm Password
                        <FontAwesomeIcon icon={faCheck} className={validMatch && confirmPassword? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !confirmPassword ? 'hide' : 'invalid'} />
                    </label>
                    <input type="password"
                        id='confirm-pass'
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        required aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby='confirmnote'
                        onFocus={() => { setConfirmPasswordFocus(true) }}
                        onBlur={() => { setConfirmPasswordFocus(false) }}
                    />
                    <p id="confirmnote" className={confirmPasswordFocus &&  !validMatch? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match first password input field
                    </p>
                    <br /> 

                    <button disabled={!validName || !validPassword || !validMatch ? true : false}
                        onClick={(e) => { saveUserRegistration(e) }}>
                        Signup
                    </button>
                    <p>Already Registered?
                    <span className='line'>
                        <a href='/login'>Sign In</a>
                    </span>
                </p>
                </form>

            </section>
        </div>
    )
}


