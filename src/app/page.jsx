'use client'
import messi from '../images/messiclear.png'
import lebron from '../images/lebronclear2.png'
import arbitrage from '../images/arbitrage.png'
import Image from 'next/image';
import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';
import Footer from '@/components/footer';
import { useAuth } from '@/contexts/authcontext';
import { useState, useEffect, Suspense } from 'react';
import FadeInSection from '@/components/fade';
import PageWrapper from '@/components/pagewrapper';
import { useAff } from '@/contexts/affiliationcontext';
import newRequest from '@/utils/newRequest';

function Home() {
  const router = useRouter()
  const {user, token, logout, login} = useAuth()
  const [monthly, setMonthly] = useState(false)
  const [isHeightLessThanWidth, setIsHeightLessThanWidth] = useState(false);
  const query = useSearchParams()
  const [pushReady, setPushReady] = useState(false)
  const affiliateId = query.get('af');
  const checkSession = query.get('checksession')
  const { affiliate, setAffiliate } = useAff()

  const pathname = usePathname();

  useEffect(() => {
    if(window !== null){
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1); // Remove the leading '#' character
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }
    }
  }, [pathname, query]);


  useEffect(() => {
    console.log("effecting")
    if (affiliateId && affiliateId != affiliate ) {
        setAffiliate(affiliateId)
        logClick(affiliateId);
    }
  }, []);

  useEffect(()=>{
    console.log("aff")
    console.log(affiliate)
  }, [affiliate])


  const check = async () => {
    for(let i = 0; i < 3; i++){
      const newU = await newRequest.get('/stripe/check', token)
      console.log("newU")
      console.log(newU)
      if(newU && newU.user && newU.user.subscribed){
        login(newU.user, token)
        setPushReady(true)
        break
      }
      else{
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
      }
    }

  }


  useEffect(()=>{
    if(user && user.subscribed && pushReady){
      router.push('/tools/arbitrage')
    }
  }, [pushReady, user])

  useEffect(()=>{
    if(checkSession == "true" && token){
      check()
    }
  }, [checkSession, token])

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

  const checkAlready = (session) => {
    console.log(session)
    if(session?.alreadySubscribed){
      login(session.user, token)
      router.push('/tools/arbitrage')
      return true
    }
    return false
  }

  const join = async () => {
    try{
      let session = {url: ""}
      if(!token){
        router.push(`/signin?action=signup&stripe=true&monthly=${monthly}`)
      }
      else if(monthly){
        session = await newRequest.get('/stripe/subscribe/monthly', token)
        console.log(session.body)
        if(!checkAlready(session)){
          router.push(session.url.url)
        }

      }
      else{
        session = await newRequest.get('/stripe/subscribe/yearly', token)
        if(!checkAlready(session)){
          router.push(session.url.url)
        }      
      }
    
    }
    catch(err){
      console.log(err)
    }
    
  }

  const loginP = (action) => {
    router.push(`/signin?action=${action}`)
  }

  const tools = () => {
    if(user.subscribed){
      router.push('/tools/arbitrage')
    }
    else if(checkSession == "true"){
      check()
    }
    else{
      router.push('/#join')
    }
  }

  const logClick = async (val) => {
    const click = await newRequest.patch('/affiliate/countclick', {code: val}, '')
  }

  return (
    <div className='main-container'>
      <div style = {{width: '100vw', minHeight: '100vh', display: "flex" }} id="landing">
          <div style = {{ marginLeft: '10vw', marginTop: '35vh', width: isHeightLessThanWidth? '40vw' : '70vw', overflow: 'hidden'}} >
            <div style = {{position: 'absolute', height: '10vh', marginLeft: '10vw'}}>
              <div className='blob blob-1'/>
              <div className='blob blob-2'/>
              <div className='blob blob-3'/>

            </div>

            <div style = {{zIndex: '2', position: 'relative', width: isHeightLessThanWidth ? '40vw' : '70vw'}}>
              <h1 className='intro-title' >What if you could win sports bets every time?</h1>

            </div>
            <div  style = {{height: '5vh', }}/>
            <p className = "intro-text">Arbitrage betting is a strategy that allows you to bet on both teams and win money regardless of which team wins the game. Our site is designed to help you find arbitrage betting opportunities way more often.</p>
          </div>
          {isHeightLessThanWidth &&
            <div style = {{ marginLeft: '10vw', marginTop: '12vh'}}>
              <Image src= {lebron} className = "lebron-picture" alt = "Lebron James, license details and download accessible below, from Wikipedia Commons" style={{height: '88vh', width: "auto"}}></Image>
            </div>}
          <div className='top-right-login' style = {{right: isHeightLessThanWidth? '2vw' : '2vw' }} >
            {user == null && token == null ?
              <div style = {{display: 'flex'}}>
                <button onClick = {()=>loginP('login')} className="primary-button"><p>Login</p></button>
                <button onClick = {()=>loginP('signup')} className='secondary-button'><p>Sign Up</p></button>
              </ div>
              :
              <div >
                <button onClick = {() => tools()} className="primary-button">Tools</button>
                <button onClick = {() => logout()} className='secondary-button'>Log Out</button>
              </ div>}
          </div>
          
      </div>
      <FadeInSection>
        <div style = {{width: '100vw', minHeight: '100vh', display: 'flex'}} id="aboutus">
          <div style = {{ marginLeft: !isHeightLessThanWidth? '10vw':'55vw', marginTop: '30vh', width: !isHeightLessThanWidth? '80vw':'35vw'}}>
            <h1>How it works</h1>
            <div style = {{height: '5vh'}} />
            <p>Arbitrage betting relies on different bookmakers having different odds.</p>
            <div style = {{height: '2vh'}} />
            <p>If two bookmakers have different odds for the same event, it is possible to make more money than you put in while betting on both teams, so that you win no matter who wins.</p>
            <div style = {{height: '2vh'}} />
            <p>These bets can be hard to find, so we find them for you.</p>
            <div style = {{height: '2vh'}}/>
            <p>Please note that people under 21, or the legal age for sports betting in your region, should not be betting and there is always inherent risk when putting money into the hands of a bookmaker.</p>
          </div>
          { isHeightLessThanWidth &&
            <div style = {{position: 'absolute', marginLeft: '5vw', marginTop: '35vh', width: '40vw'}}>
              <div className = "arbitrage-picture-wrapper">
                <Image src = {arbitrage} alt = "A picture of our arbitrage tool" className='arbitrage-picture' />
              </div>
            </div>
          }
          

        </div>
      </FadeInSection>
      <FadeInSection>
        <div style = {{width: '100vw', minHeight: '100vh', display: "flex"}} id = "join">
            <div className = "join-div" style = {{width: isHeightLessThanWidth? '' : '100vw', marginRight: isHeightLessThanWidth? '0' : '10%'}}>
              <div className = "join-box" style = {{width: isHeightLessThanWidth? '25vw':'100%', borderRadius: '20px', display: 'flex', flexDirection: 'column'}}>
                <div style = {{textAlign: 'center'}}>            
                  <h1 className = "join-title">Join Us</h1>
                  <p>${!monthly? "15" : "20"}/month billed {!monthly? "annually" : "monthly"}</p>
                  {!monthly&& <p style = {{color: '#dd1111'}}>25% DISCOUNT</p>}
                  <div>
                    <button onClick = {()=>setMonthly(true)} className = {`monthly-annual ${monthly? "selected-plan" : "non-selected-plan"}`}>Monthly Plan</button>
                    <button onClick = {()=>setMonthly(false)} className = {`monthly-annual ${!monthly? "selected-plan" : "non-selected-plan"}`}>Annual Plan</button>
                  </div>
                </div>
                <h2 className = "perks-title">Perks</h2>
                <p className='perks-text'>- Access to the current (beta) version of our arbitrage bets searcher</p>
                <p className='perks-text'>- Access to our odds calculator</p>
                <button className='join-button' onClick = {join}><p>Join Now</p></button>
              </div>
            </div>
            { isHeightLessThanWidth&&
              <div style = {{marginLeft: '10%', marginTop: '15vh', width: '40vw'}}>
                <div>
                  <Image className = 'messi' src = {messi} style={{height: '85vh', width: 'auto'}} alt = "Lionel Messi, license details and download accessible below, from Wikipedia Commons"></Image>
                </div>
              </div>
            } 
        </div>
      </FadeInSection>
      <Footer />
    </div>
  );
}

const WrappedHomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
};

export default WrappedHomePage