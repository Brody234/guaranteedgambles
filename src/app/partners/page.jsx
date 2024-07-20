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
    const [agreed, setAgreed] = useState(false)
    const [join, setJoin] = useState(true)
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
            return
        }
        else if(!agreed){
            setJoin(false)
            return
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
                    <h1 style = {{marginTop: '7vh', marginLeft: '5vw', marginRight: '5vw'}}>Want to join our partner program and start earning today?</h1>
                    <p style = {{marginTop: '2vh', marginLeft: '5vw', marginRight: '5vw'}}>We offer partners who join through our site 33% on all non refunded sales they can cause (tracked with a code). That means if you get someone to sign up with your link, and they stay subscribed for 2 years, you get consistent payments for two years. This can offer a level of income stability not found in content creation. If we reached out to you directly, or you think you could be a significant player in our marketing strategy, feel free to reach out to info@guaranteedgambles.com to negotiate a higher %. Becoming a partner costs you nothing, and you can do it instantly. No requirements to join. Enter a code, hit join and you&aposll be ready to start. We recommend entering a short code, as people will either have to remember it or click a link with it.</p>
                    <div>
                        <input placeholder = "Code" value={code} onChange={(e)=>setCode(e.target.value)} className = "login-box" style = {{height: '5vh', width: '10vw', marginLeft: '8vw', minWidth: '100px' }}></input>
                        <button className='primary-button'  style = {{marginTop: '4vh', marginLeft: '4vw', marginRight: '8vw'}} onClick = {jointoday}><p>Join Today</p></button>

                        <div style={{ marginBottom: '1em', display: 'flex', alignItems: 'center' }}> 
                            <input 
                                type="checkbox" 
                                required 
                                style = {{marginRight: '.5em', marginLeft: '8vw'}}
                                checked={agreed} 
                                onChange={(e) => setAgreed(!agreed)} 
                            />
                            <label onClick={()=>router.push('/partnertos')} style = {{color: join? 'white' : 'red'}}>
                                I have read and agree to the terms of use.
                            </label>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            )
    }
    return(
        <div className="main-container">
            <div style = {{minHeight: '100vh'}}>
            <h1 style = {{marginLeft: '2em', marginTop: '1em', marginRight: '2em', textAlign: 'center'}}>Partner Dashboard</h1>
            <div style = {{display: 'flex', width: '100vw', justifyContent: 'space-around', marginTop: '3em', flexDirection: isHeightLessThanWidth? 'row': 'column'}}>
                <div className = "affiliate-box" style = {{backgroundColor: '#dd8844', ...adaptableMoneyBox}} >
                    <h3 style = {{...adaptableMoneyBoxH3}}>Pending Sales</h3>
                    <p className="affiliate-money" style = {{...adaptableMoneyBoxMoney}} >${affiliateData?.pendingFunds.toFixed(2) || 0}</p>
                </div>
                <div className="affiliate-box" style = {{backgroundColor: "#33c390", ...adaptableMoneyBox}}>
                    <h3 style = {{...adaptableMoneyBoxH3}}>Approved Sales</h3>
                    <p className="affiliate-money" style = {{...adaptableMoneyBoxMoney}}>${0}</p>
                </div>
                <div className="affiliate-box" style = {{backgroundColor: '#bb39cc', ...adaptableMoneyBox}}>
                    <h3 style = {{...adaptableMoneyBoxH3}}>Ready To Pay</h3>
                    <p className="affiliate-money" style = {{...adaptableMoneyBoxMoney}}>${0}</p>
                </div>
            </div>
            <MonthChart signups = {getLast30DaysData(affiliateData?.signs)} clicks = {getLast30DaysData(affiliateData?.clicks)}/>
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

    // Aggregate counts for each date
    const aggregatedData = {};
    if (Array.isArray(dataArray)) {
        dataArray.forEach(item => {
            const date = formatDate(new Date(item.date));
            if (aggregatedData[date]) {
                aggregatedData[date] += item.count;
            } else {
                aggregatedData[date] = item.count;
            }
        });
    }

    // Create a map from the aggregated data
    const dataMap = new Map(Object.entries(aggregatedData));

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
