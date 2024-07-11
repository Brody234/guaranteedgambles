'use client'
import Header from '@/components/header';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/authcontext';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import newRequest from '@/utils/newRequest';
import { format, isToday, isThisWeek, addDays, isAfter } from 'date-fns';
import dynamic from 'next/dynamic';
import { useOpp } from '@/contexts/arbitragecontext';
import {decimalToAmerican} from '../calculator/calculations'

const CheckDimensions = dynamic(() => import('@/components/checkdimensions'), { ssr: false });

export default function Arb() {
    const {user, isLoading, token} = useAuth()
    const [droppedDown, setDroppedDown] = useState([])
    const router = useRouter()
    const [region, setRegion] = useState('');
    const [error, setError] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [oppLoad, setOppLoad] = useState(false)
    const {opportunities, setOpportunities} = useOpp()
    const [outRegion, setOutRegion] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    const [isHeightLessThanWidth, setIsHeightLessThanWidth] = useState(false);

    /*useEffect(() => {
      if (window) {
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
  }, []);*/

    const disable = () => {
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
      }, 10000); // 10 seconds
    };
  

    const handleChange = (event) => {
      setRegion(event.target.value);
    };

    const arb = async ()=>{
        if (token && region){
            setError(false)
            setOppLoad(true)
            setNotFound(false)
            setOutRegion(false)
            try{
              const data = await newRequest.get('/arbitrage/'+region, token)
              if(data.message == 'no opportunities found' || data.opportunities.length == 0){
                console.log('here')
                setNotFound(true)
                setOppLoad(false)  
                setOpportunities([])
              }
              else{
                setOpportunities(data.opportunities.sort((a, b)=>b.profit-a.profit))
                setOppLoad(false)  
              }
            }
            catch(err){
              setOppLoad(false)
              setOpportunities([])
              
              setError(true)
              
            }
        }
        else if(!region){
          setOutRegion(true)
        }
    } 
  
    useEffect(()=>{
        if(!isLoading){
            if(!user || !user?.subscribed){
                router.push('/#join')
            }
        }
    }, [user, isLoading])

    useEffect(()=>{
        const empty = []
        for(let i = 0; i < opportunities?.length; i++){
            empty.push(false)
        }
        setDroppedDown(false)
    }, [opportunities])

    const dropDown = (key, val) => {
        const empty = []
        for(let i = 0; i < opportunities.length; i++){
            empty.push(false)
        }
        console.log(key)
        empty[key] = val
        setDroppedDown(empty)
    }

    return (
        <div className='main-container'>
            <Header />
            <div style = {{width: '100vw', minHeight: '90vh'}}>
                <div style = {{width: '100vw', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h1>Arbitrage Finder</h1>
                    <div style = {{height: '2vh'}}/>
                    <div style = {{width: isHeightLessThanWidth? '40vw': '90vw'}}>
                        <p>This page lists out possible arbitrage opportunities. It is important to check with both bookmakers to make sure they still exist.</p>
                    </div>
                    <div style = {{width: '60vw', marginTop: '1em', display: "flex", alignItems: 'center', justifyContent: 'space-between', flexDirection: isHeightLessThanWidth? 'row':'column'}}>
                        <div style = {{display: 'flex'}}>
                            <select value={region} className = "select-region" style = {{border: !outRegion? "" : "1px red solid"}} onChange={handleChange}>
                                <option value="">Select A Region</option>
                                <option value="us">US</option>
                                <option value="uk">UK</option>
                                <option value="au">AU</option>
                                <option value="eu">EU</option>
                            </select>
                        </div>

                        <button onClick = {()=>{arb()}}        
                            className = "find-opportunities-button" style = {{marginTop: isHeightLessThanWidth? '' : '1vh'}}><p>Find Opportuninities</p></button>
                    </div>
                    <div style = {{height: '3vh'}}/>
                </div>
                <div>
                    <h2 className = "probable-text">Probable Arbitrage Opportunities</h2>
                    {notFound && <div style = {{width: '80vw', marginRight: '10vw', marginLeft: '10vw'}}><p>Our algorithm was unable to find any arbitrage bets at this time. We are always working to make it more effective, and we have automatically reported this issue. If this becomes a recurring issue, please contact us at info@guaranteedgambles.com. Also note that the best arbitrage opportunities will be found when a game is being played.</p></div> }
                    {error? <div style = {{width: '80vw', marginRight: '10vw', marginLeft: '10vw'}}><p>We have encountered an error trying to find arbitrage data. Please try again in a few minutes. If this becomes a recurring issue, help us become aware by reporting it to info@guaranteedgambles.com.</p></div> : <div>{
                      !oppLoad? <div>
                      {opportunities && opportunities.length >0 && opportunities?.map((val, i)=>{
                          return(
                              <Arbitrage opportunity={val} key = {i} index = {i} dropDown={dropDown} droppedDown = {droppedDown}/>
                          )
                      })}</div> : <div style = {{width: '100vw', display: 'flex', justifyContent: 'center'}}><Spinner /></div>
                    }</div>}
                </div>
            </div>
            <Footer />
            <CheckDimensions setIsHeightLessThanWidth={setIsHeightLessThanWidth} />
        </div>
    );
}

function Arbitrage({ opportunity, index, dropDown, droppedDown }) {
    const [price, setPrice] = useState(0);
  
    const dropDownButton = (index, val) => {
      setMaxHeight('33vh')
      dropDown(index, val);
    }

    const handleDetailsClick = (event) => {
        event.stopPropagation();
    }

    const [maxHeight, setMaxHeight] = useState('0vh');

    useEffect(() => {
      if (droppedDown[index]) {
        setMaxHeight('33vh'); // Set a high value for max-height
      } else {
        setMaxHeight('33vh');
        setMaxHeight('0vh');
      }
    }, [droppedDown, index]);
  
    const handleTransitionEnd = () => {
      if (droppedDown[index]) {
        setMaxHeight('none'); // Reset max-height to none after transition
      }
    };
  
    useEffect(()=>{
      console.log(opportunity)
    }, [opportunity])
    const dropdownStyle = {
      maxHeight: maxHeight,
      overflow: 'hidden',
      transition: 'max-height 0.5s ease-in-out, padding 0.5s ease-in-out, margin-top 0.5s ease-in-out',
      backgroundColor: '#1e1e1e',
      padding: droppedDown[index] ? '.9em' : '0',
      borderRadius: '.6em',
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
      marginTop: droppedDown[index] ? '10px' : "0px",
      border: droppedDown[index] ? ".05em" : "0px"
    };
  
    return (
      <div key={index} style={{ display: 'flex', flexDirection: 'column', width: '100vw', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: '4vh' }}>
        <div className="opportunity-card" style={{ display: 'flex', flexDirection: 'column', width: '80vw', justifyContent: 'left', transition: 'border-radius 0.2s ease-in-out', cursor: 'pointer', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '15px', color: '#fff' }} onClick={() => dropDownButton(index, !droppedDown[index])}>
          <h2 style={{ margin: '0 0 10px 0', textAlign: 'left' }}>{opportunity.game}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="percent" style={{ margin: '0', fontSize: '1.2em' }}>{(opportunity.profit * 100).toFixed(1)}%</p>
            <p className="time" style={{ margin: '0', fontSize: '1em', textAlign: 'right' }}>{formatDate(opportunity.matchStart)}</p>
          </div>
          <div className="details" onTransitionEnd={handleTransitionEnd} style={dropdownStyle} onClick={handleDetailsClick}>
            <div className='bet' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Bet bet={opportunity.bets[0]} price={price} />
              <Bet bet={opportunity.bets[1]} price={price} />
            </div>
            <p>Sport: {opportunity.sport}</p>
            <div style = {{display: 'flex', width: '100%', justifyContent: "space-between"}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Price: </p>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className = "price-box" style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#333', color: '#fff' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Profit: ${(price*opportunity.profit).toFixed(2)} </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function Bet({ bet, price }) {
    return (
      <div  className='bet-text' style={{ flex: 1, margin: '0 .55em', padding: '.55em', backgroundColor: '#333', borderRadius: '.4em', color: '#fff', transition: 'padding 0.5s ease-in-out' }}>
        <p><strong>Bet {bet.number}</strong></p>
        <p >Site: {bet.site}</p>
        <p>Side: {bet.side}</p>
        <p>Odds: {decimalToAmerican(bet.odds).toFixed(2)}</p>
        <p>Type: {formatString(bet.type)}</p>
        <p>Amount: ${(price*bet.share).toFixed(2)}</p>
      </div>
    );
  }
  
  const formatString = (str) =>{
    if(str == 'h2h'){
      return 'Head to head'
    }
    else if (str == 'totals'){
      return 'Over Under'
    }
    else return str
  }
const formatDate = (date) => {
    const now = new Date();
    const matchDate = new Date(date);

    if (isToday(matchDate)) {
        return format(matchDate, 'p'); // Format as local time
    } else if (isThisWeek(matchDate)) {
        return format(matchDate, 'EEEE p'); // Format as Day of the week and time
    } else if (isAfter(matchDate, addDays(now, 7))) {
        return format(matchDate, 'MM/dd/yy p'); // Format as dd/mm/yy and time
    } else {
        return format(matchDate, 'EEEE p'); // Format as Day of the week and time
    }
};

const Spinner = () => {
  return <div className="spinner-opp-load"></div>;
};
