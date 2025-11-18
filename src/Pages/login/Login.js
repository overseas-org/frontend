import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Login.css';
import { jwtDecode } from 'jwt-decode';
import { sso_login, login, signup } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/loading/Loading';
import { Back } from '../../components/back/Back';

export default function Login() {
  const [logginIn, setLoggingIn] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
    <div className='login-page'>
      {loading && <Loading/>}
      { !loading && (logginIn ? <SignIn/> : <LoginCover setLoggingIn={setLoggingIn} />)}
      { !loading && (!logginIn ? <SignUp/> : <SignUpCover setLoggingIn={setLoggingIn} />)}
    </div>
  )
}


function SignIn({  }) {
  const navigate = useNavigate();
  const [LoginData, setLoginData] = useState({
    "username": "",
    "password": "",
  });
  // const [ssoLoginData, setSsoLoginData] = useState({
  //   "email": "",
  //   "sso_verified": false
  // })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  async function login_and_nav() {
    setLoading(true)
    if (await login(LoginData, setError)) {
      navigate("/")
    }
    setLoading(false)
  } 
  async function sso_login_and_nav(loginData) {
    setLoading(true)
    if (await sso_login(loginData, setError)) {
      navigate("/")
    }
    setLoading(false)
  } 
  return (
      <div className='sign-in form-block glassmorphism'>
        <div className='sso'>
          <GoogleSSO setError={setError} action="login" action_func={sso_login_and_nav} />
        </div>
        <hr className='line'/>
        <div className='info-input'>
          <label>username:</label>
          <input spellCheck={false} value={LoginData.username} onChange={(e)=>{setLoginData({...LoginData, username: e.target.value})}} type='text'/>
        </div>
        <div className='info-input'>
          <label>password:</label>
          <input value={LoginData.password} onChange={(e)=>{setLoginData({...LoginData, password: e.target.value})}} type='password'/>
        </div>
        <button onClick={login_and_nav} className='active-button'>Sign in</button>
        {!loading && <label className='error'>{error}</label>}
        {loading && <Loading />}
      </div>
  )
}

function LoginCover({ setLoggingIn }) {
  return (
      <div className='sign-in form-block cover'>
        <button onClick={()=>setLoggingIn(true)}>Sign in</button>
      </div>
  )
}

function ChoseAccount({ setAccount, setCreateAccount, setPage }) {
  return(
    <div className='chose-account'>
      <div className='info-input'>
          <select onChange={(e)=>setCreateAccount(e.target.value == "create")}>
            <option value="create">create new account</option>
            <option value="existing">sign in existing account</option>
          </select>
      </div>
      <div className='info-input'>
          <label>account:</label>
          <input onChange={(e)=>setAccount(e.target.value)} spellCheck={false} type='text'/>
      </div>
      <button className='active-button' onClick={()=>setPage("user_data")}>next</button>
    </div>
  )
}

function SignUp() {
  const [page, setPage] = useState("account")
  const [userData, setUserData] = useState({
    "username": "",
    "google_sso_enabled": "false",
    "password": "",
    "first_name": "",
    "last_name": "",
    "account": "",
    "create_account": true,
    "email": ""
  })
 
  return (
    <div className='sign-up form-block glassmorphism'>
      {page == "loading" && <Loading/>}
      {page == "account" && <ChoseAccount setPage={setPage} setCreateAccount={(create_account)=>setUserData({...userData, create_account: create_account})} setAccount={(account)=>setUserData({...userData, account: account})} setPage={setPage}/>}
      {page == "user_data" && <SignUpForm back={()=>setPage("account")} setPage={setPage} setUserData={setUserData} userData={userData}/>}
      {page == "password" && <SignUpPasswordForm back={()=>setPage("user_data")} setUserData={setUserData} userData={userData}/>}
    </div>
  )
}

function SignUpPasswordForm({ userData, setUserData, back }) {
  const [error, setError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();

  async function validate_and_signup() {
    if (checkPasswordsMatch()) {
      if (await signup(userData, setError)){
        navigate("/");
      };
    }
  } 
  function checkPasswordsMatch() {
    if (userData.password != confirmPassword) {
      setError ("passwords do not match")
      return false;
    }
    else {
      setError("")
      return true;
    }
  }
  return(
    <div className='chose-account'>
      <Back back={back}/>
      <div className='info-input'>
          <label>password:</label>
          <input value={userData.password} onChange={(e)=>setUserData({...userData, password: e.target.value})} type='password'/>
      </div>
      <div className='info-input'>
          <label>re-type password:</label>
          <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type='password'/>
      </div>
      <button className='active-button' onClick={validate_and_signup}>sign up</button>
      <label className='error'>
        {error}
      </label>
    </div>
  )
}

function SignUpForm({userData, setUserData, setPage, back}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  function setAttr(attr, value) {
    setUserData({...userData, [attr]: value})
  }

  async function sso_sign_up(loginData){
    setLoading(true)
    if (await signup({
          ...userData,
          ...loginData,
        }, setError)){
      navigate("/");
    }
    setLoading(false)
  }

  return (
      loading ? <Loading/> : 
      <div className='sign-up form-block'>
        <Back back={back}/>
        <GoogleSSO setError={setError} action_func={sso_sign_up} action='signup'/>
        <hr className='line'/>
        <div className='info-input name'>
          <div className='name-part'>
            <label>First Name:</label>
            <input spellCheck={false} value={userData["first_name"]} onChange={(e)=>{setAttr("first_name", e.target.value)}} type='text'/>
          </div>
          <div className='name-part'>
            <label>Last Name:</label>
            <input spellCheck={false} value={userData["last_name"]} onChange={(e)=>{setAttr("last_name", e.target.value)}} type='text'/>
          </div>
        </div>
        <hr className='line'/>
        <div className='info-input'>
          <label>username:</label>
          <input spellCheck={false} value={userData["username"]} onChange={(e)=>{setAttr("username", e.target.value)}} type='text'/>
        </div>
        <div className='info-input'>
          <label>email:</label>
          <input autoComplete='email' spellCheck={false} value={userData["email"]} onChange={(e)=>{setAttr("email", e.target.value)}} type='email'/>
        </div>
        <button onClick={()=>{setPage("password")}} className='active-button'>Sign up</button>
        <label className='error'>{error}</label>
      </div>
  )
}

function SignUpCover({ setLoggingIn }) {
  return (
      <div className='sign-up form-block cover'>
        <button onClick={()=>setLoggingIn(false)}>Sign Up</button>
      </div>
  )
}

function GoogleSSO({ setError, action_func, action="login" }) {
  // const [hovered, setHovered] = useState(false);
  return (
    <div
      className="google-sso"
      // onMouseEnter={async () => {
      //   if(!hovered){
      //     setHovered(true);
      //   }}}
      // onMouseLeave={() => setHovered(false)}
    >
      <GoogleOAuthProvider clientId="285418811606-fsdcoueb46qs60imjhou0otek4p0vfak.apps.googleusercontent.com">
        <GoogleLogin
          shape='circle'
          type='standard'//{hovered ? 'standard' : 'icon'}
          onSuccess={credentialResponse => {
            if (credentialResponse.credential) {
              const decoded = jwtDecode(credentialResponse.credential);
              let loginData = null;
              // setUserData("first_name", decoded.given_name)
              // setUserData("last_name", decoded.family_name)
              // setUserData("email", decoded.email)
              // setUserData("google_sso_enabled", "true")
              if (action == "login") {
                loginData = {
                  username: decoded.email,
                  sso_verified: true
                }
              }
              else if (action == "signup") {
                loginData = {
                  email: decoded.email,
                  first_name: decoded.given_name,
                  last_name: decoded.family_name,
                  google_sso_enabled: true,
                  sso_verified: true
                }
              }
              action_func(loginData);

            } else {
              setError('No credential found');
            }
          }}
          onError={() => {
            setError('SSO login failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  )
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}