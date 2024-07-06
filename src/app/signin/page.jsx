'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import messi from '../../images/messi.jpg'
import Image from 'next/image';
import Footer from '@/components/footer';
import { useAuth } from '@/contexts/authcontext';
import newRequest from '@/utils/newRequest';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const [match, setMatch] = useState(true)
  const [agree, setAgree] = useState(true)
  const [loginfo, setLoginfo] = useState({email: "", password: "", confirmPassword: "", phoneNumber: "", iagreetotos: false})
  const [isSignup, setIsSignup] = useState(true);
  const {token, user, login} = useAuth()
  
  const updateLoginfo = (property, val) => {
    setLoginfo(prevLoginfo => ({
        ...prevLoginfo,
        [property]: val
    }));
  };  

  useEffect(()=>{
    if(user && token){
      if(user?.subscribed){
        router.push('/tools/arbitrage')
      }
      else{
        router.push('/pay')
      }
    }
  }, [token, user])

  const loginButton = async () => {
    try{
      const data = await newRequest.post('/user/login', {logname: loginfo.email, password: loginfo.password})
      console.log(data)
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
      const data = await newRequest.post('/user/new', {email: loginfo.email, newPassword: loginfo.password, phoneNumber: loginfo.phoneNumber, iagreetotos: loginfo.iagreetotos})
      console.log(data)
      login(data.user, data.token)
    }
    catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    console.log(action)
    if (action === 'signup') {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [action]);

  return (
    <div>
        <div style = {{width: '100vw', height: '100vh'}} id="signup">
            <div style = {{position: 'absolute', width: '50vw', marginLeft: '0vw'}}>
                <div style = {{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1>{isSignup? "Sign Up" : "Log In"}</h1>
                    <p>Email</p>
                    <input value = {loginfo.email} onChange={(e)=>updateLoginfo("email", e.target.value)}></input>
                    {isSignup? <><p>Phone Number (optional)</p>
                    <input value = {loginfo.phoneNumber} onChange={(e)=>updateLoginfo("phoneNumber", e.target.value)}></input>
                    </>:''}
                    <p>Password</p>
                    <input value = {loginfo.password} onChange={(e)=>updateLoginfo("password", e.target.value)}></input>
                    {isSignup && (
                      <>
                        <p>Confirm Password</p>
                        <input
                          value={loginfo.confirmPassword}
                          onChange={(e) => updateLoginfo("confirmPassword", e.target.value)}
                          style={{ borderColor: match ? 'none' : 'red', borderWidth: '1px', borderStyle: 'solid' }}
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
                    <label style = {{color: agree? 'white' : 'red'}}>
                          I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">terms of service</a>.
                        </label>
                      </div>: 
                    <></>}
                    {isSignup? <button onClick = {signup}><p>Sign Up</p></button> : <button onClick = {loginButton}><p>Log In</p></button>}
                    {isSignup? <button onClick = {()=>setIsSignup(false)}><p>Already have an account? Log in.</p></button> : <button onClick = {()=>setIsSignup(true)}><p>Need an account? Sign up.</p></button>}
                </div>
            </div>
            <div style = {{position: 'absolute', width: '50vw', marginLeft: '50vw', marginTop: '0vh'}}>
                <Image style = {{height: '100vh', width: '45vw'}} src = {messi} alt = "Lionel Messi, license details and download accessible below, from Wikipedia Commons"></Image>
            </div>
        </div>
        <Footer />
    </div>
    
  );
};
