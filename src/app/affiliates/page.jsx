'use client'
import Footer from '@/components/footer';
import {useState, useEffect} from 'react'
import MonthChart from './afcomponents/afchart';
import { useAuth } from '@/contexts/authcontext';
import { useRouter } from 'next/navigation';
import newRequest from '@/utils/newRequest';

export default function Affiliates() {
    const {user, token, affiliateData, setAfData, login} = useAuth()
    const [isHeightLessThanWidth, setIsHeightLessThanWidth] = useState(false);
    const [code, setCode] = useState('')
    const router = useRouter()

    const refresh = async () =>{
        try{
            const data = await newRequest.get('/affiliate/affdata', token)
            console.log(data)
            setAfData(data.affiliate)    
        }
        catch(err){

        }
    }

    useEffect(()=>{
        refresh()
    }, [token])

    const jointoday = async () => {
        if(!user){
            router.push('/signin')
        }
        else{
            try{
                const af = await newRequest.post('/affiliate/join', {code: code}, token)
                setAfData(af.affiliate)
                login(af.user, token)
            }
            catch(err){

            }
        }
    }

    useEffect(() => {
      const checkDimensions = () => {
        const { innerHeight, innerWidth } = window;
        setIsHeightLessThanWidth(innerHeight < innerWidth);
      };
  
      checkDimensions();
      window.addEventListener('resize', checkDimensions);
  
      return () => {
        window.removeEventListener('resize', checkDimensions);
      };
    }, []);
    
    const adaptableMoneyBox = {
        width: isHeightLessThanWidth? '20vw' : '80vw', marginLeft: isHeightLessThanWidth? '0': "10vw", marginRight: isHeightLessThanWidth? '0' : '10vw', marginBottom: isHeightLessThanWidth? "0" : '3vh'
    }

    const adaptableMoneyBoxMoney = {
        fontSize: isHeightLessThanWidth? '3vw' : '12vw'
    }

    const adaptableMoneyBoxH3 = {
        fontSize: isHeightLessThanWidth? '1.4vw' : '5.6vw'
    }

    if(!user || !user.affiliateId){
        return(
            <div className='main-container'>
                <div style = {{width: '100vw', minHeight: '100vh'}}>
                    <h1 style = {{marginTop: '7vh', marginLeft: '5vw', marginRight: '5vw'}}>Want to join our affiliate program and start earning today?</h1>
                    <p style = {{marginTop: '2vh', marginLeft: '5vw', marginRight: '5vw'}}>We offer affiliates who join through our site 33% on all non refunded sales they can cause (tracked with a code). That means if you get someone to sign up with your link, and they stay subscribed for 2 years, you get consistent payments for two years. This can offer a level of income stability not found in content creation. If we reached out to you directly, or you think you could be a significant player in our marketing strategy, feel free to reach out to info@guaranteedgambles.com to negotiate a higher %. Becoming an affiliate costs you nothing, and you can do it instantly. No requirements to join. Enter a code, hit join and you'll be ready to start. We recommend entering a short code, as people will either have to remember it or click a link with it.</p>
                    <div>
                        <input placeholder = "Code" value={code} onChange={(e)=>setCode(e.target.value)} className = "login-box" style = {{height: '5vh', width: '10vw', marginLeft: '8vw', minWidth: '100px' }}></input>
                        <button className='primary-button'  style = {{marginTop: '4vh', marginLeft: '4vw', marginRight: '8vw'}} onClick = {jointoday}><p>Join Today</p></button>
                    </div>
                </div>
                <Footer />
            </div>
            )
    }
    return(
        <div className="main-container">
            <div style = {{minHeight: '100vh'}}>
            <h1 style = {{marginLeft: '2em', marginTop: '1em', marginRight: '2em', textAlign: 'center'}}>Affiliate Dashboard</h1>
            <div style = {{display: 'flex', width: '100vw', justifyContent: 'space-around', marginTop: '3em', flexDirection: isHeightLessThanWidth? 'row': 'column'}}>
                <div className = "affiliate-box" style = {{backgroundColor: '#dd8844', ...adaptableMoneyBox}} >
                    <h3 style = {{...adaptableMoneyBoxH3}}>Pending Sales</h3>
                    <p className="affiliate-money" style = {{...adaptableMoneyBoxMoney}} >${affiliateData.pendingSales}</p>
                </div>
                <div className="affiliate-box" style = {{backgroundColor: "#33c390", ...adaptableMoneyBox}}>
                    <h3 style = {{...adaptableMoneyBoxH3}}>Approved Sales</h3>
                    <p className="affiliate-money" style = {{...adaptableMoneyBoxMoney}}>${affiliateData.approvedSales}</p>
                </div>
                <div className="affiliate-box" style = {{backgroundColor: '#bb39cc', ...adaptableMoneyBox}}>
                    <h3 style = {{...adaptableMoneyBoxH3}}>Ready To Pay</h3>
                    <p className="affiliate-money" style = {{...adaptableMoneyBoxMoney}}>${affiliateData.paySales}</p>
                </div>
            </div>
            <MonthChart signups = {affiliateData.signups} clicks = {getLast30DaysData(affiliateData.clicks)}/>
            </div>
            <Footer />
        </div>
    )
}

function getLast30DaysData(dataArray) {
    const result = [];
    const today = new Date();
    
    // Helper function to format dates as YYYY-MM-DD
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Create a map from the input data for quick lookup
    const dataMap = new Map(dataArray.map(item => [formatDate(new Date(item.date)), item.count]));

    // Loop through the last 30 days
    for (let i = 29; i >= 0; i--) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() - i);
        const formattedDate = formatDate(currentDate);
        
        // Get the data for the current date or use 0 if not present
        const dataPoint = dataMap.get(formattedDate) || 0;
        
        result.push({ date: formattedDate, count: dataPoint });
    }

    return result;
}

