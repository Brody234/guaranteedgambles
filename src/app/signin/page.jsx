'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import messi from '../../images/messiclear.png'
import Image from 'next/image';
import Footer from '@/components/footer';
import { useAuth } from '@/contexts/authcontext';
import newRequest from '@/utils/newRequest';
import { useAff } from '@/contexts/affiliationcontext';

function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const stripe = searchParams.get('stripe')
  const {affiliate} = useAff()
  const monthly = searchParams.get('monthly')
  const [match, setMatch] = useState(true)
  const [agree, setAgree] = useState(true)
  const [loginfo, setLoginfo] = useState({email: "", password: "", confirmPassword: "", phoneNumber: "", iagreetotos: false, code: affiliate })
  const [isSignup, setIsSignup] = useState(true);
  const {token, user, login} = useAuth()
  const [isHeightLessThanWidth, setIsHeightLessThanWidth] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {

    const checkDimensions = () => {
      const { innerHeight, innerWidth } = window;
      setIsHeightLessThanWidth(innerHeight < innerWidth);
    };

    checkDimensions();
    window.addEventListener('resize', checkDimensions);

    return () => {
      window.removeEventListener('resize', checkDimensions);
    };
  }
  }, []);

  useEffect(()=>{
    updateLoginfo('code', affiliate)
  }, [affiliate])

  const updateLoginfo = (property, val) => {
    setLoginfo(prevLoginfo => ({
        ...prevLoginfo,
        [property]: val
    }));
  };  

  const checkAlready = (session) => {
    if(session?.alreadySubscribed){
      login(session.user, token)
      router.push('/tools/arbitrage')
      return true
    }
    return false
  }

  const checkout = async () =>{
    let session
    if(monthly == "true"){
      session = await newRequest.get('/stripe/subscribe/monthly', token)
    }
    else{
      session = await newRequest.get('/stripe/subscribe/yearly', token)
    }
    if(!checkAlready(session)){
      router.push(session.url.url)
    }  
  }

  useEffect(()=>{
    if(user && token){
      if(user?.subscribed){
        router.push('/tools/arbitrage')
      }
      else{
        if(stripe){
          checkout()
        }
        else{
          router.push('/#join')
        }
      }
    }
  }, [token, user])

  const loginButton = async () => {
    try{
      const data = await newRequest.post('/user/login', {logname: loginfo.email, password: loginfo.password})
      login(data.user, data.token)
    }
    catch(err){
      console.log(err)
    }
  }

  const signup = async () => {
    if(!loginfo.iagreetotos){
      setAgree(false)
      return
    }
    else{
      setAgree(true)
    }
    if(loginfo.confirmPassword != loginfo.password){
      setMatch(false)
      return
    }
    else{
      setMatch(true)
    }

    try{
      const data = await newRequest.post('/user/new', {email: loginfo.email, newPassword: loginfo.password, phoneNumber: loginfo.phoneNumber, iagreetotos: loginfo.iagreetotos, code: loginfo.code})
      login(data.user, data.token)
    }
    catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    if (action === 'signup') {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [action]);

  return (
    <div className = "main-container">
        <div  style = {{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'space-between'}} id="signup">
            <div style = {{width: isHeightLessThanWidth? '40vw' : '90vw', marginRight: isHeightLessThanWidth? '0' : '5vw', marginLeft: isHeightLessThanWidth? '0' : '5vw'}}>
                <div style = {{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div className = 'log-text-case'> 
                      <h1 className='log-text'>{isSignup? "Sign Up" : "Log In"}</h1>
                    </div>
                    <input placeholder = "Email" value = {loginfo.email} onChange={(e)=>updateLoginfo("email", e.target.value)} className='login-box' style = {{width: isHeightLessThanWidth? '50%':'80%'}}></input>
                    {isSignup? <><p></p>
                    <input  placeholder = "Phone Number (optional)" value = {loginfo.phoneNumber || ""} onChange={(e)=>updateLoginfo("phoneNumber", e.target.value)} className='login-box' style = {{width: isHeightLessThanWidth? '50%':'80%'}}></input>
                    </>:''}
                    <input placeholder = "Password" type = "password" value = {loginfo.password} onChange={(e)=>updateLoginfo("password", e.target.value)} className='login-box' style = {{width: isHeightLessThanWidth? '50%':'80%'}}></input>
                    {isSignup && (
                      <>
                        <input
                          value={loginfo.confirmPassword}
                          className='login-box'
                          type = "password"
                          placeholder='Confirm Password'
                          onChange={(e) => updateLoginfo("confirmPassword", e.target.value)}
                          style={{ borderColor: match ? '#00000000' : 'red', borderWidth: '1px', borderStyle: 'solid', width: isHeightLessThanWidth? '50%':'80%'}}
                          
                        />
                      </>
                    )}
                    {isSignup? <div style={{ marginBottom: '1em', display: 'flex', alignItems: 'center' }}> 
                      <input 
                        type="checkbox" 
                        required 
                        style = {{marginRight: '.5em'}}
                        checked={loginfo.iagreetotos} 
                        onChange={(e) => updateLoginfo("iagreetotos", !loginfo.iagreetotos)} 
                      />
                    <label onClick={()=>router.push('/termsofuse')} style = {{color: agree? 'white' : 'red'}}>
                          I have read and agree to the terms of use.
                        </label>
                      </div>: 
                    <></>}
                    {isSignup? <button onClick = {signup} className = 'primary-button'><p>Sign Up</p></button> : <button onClick = {loginButton} className = 'primary-button'><p>Log In</p></button>}
                    {isSignup? <button onClick = {()=>setIsSignup(false)} className = 'switch-logtype-text'><p>Already have an account? Log in.</p></button> : <button onClick = {()=>setIsSignup(true)} className = 'switch-logtype-text'><p>Need an account? Sign up.</p></button>}
                </div>
            </div>
            {isHeightLessThanWidth&&
            <div style = {{ width: '50vw', marginTop: '0vh'}}>
                <Image className = "messi" style = {{height: '100vh', width: 'auto'}} src = {messi} alt = "Lionel Messi, license details and download accessible below, from Wikipedia Commons"></Image>
            </div>}
        </div>
        <Footer />
    </div>
    
  );
};

const WrappedSignInPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
};

export default WrappedSignInPage;
