'use client'
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/authcontext"
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic';

const CheckDimensions = dynamic(() => import('@/components/checkdimensions'), { ssr: false });

export default function Header() {

    const router = useRouter()
    const pathname = usePathname()
    const { logout } = useAuth()
    const [isHeightLessThanWidth, setIsHeightLessThanWidth] = useState(false);

    const [isBelowThreshold, setIsBelowThreshold] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {

      const handleResize = () => {
        setIsBelowThreshold(window.innerWidth < 550);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    }, []);
  
  
    /*
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
      }, []);*/

    const headerListItem = {
        paddingRight: "2em",
        paddingLeft: "2em"
    }
    const arbitrage = () => {
        router.push('/tools/arbitrage')
    }
    const calculator = () => {
        router.push('/tools/calculator')
    }
    const isActive = (path) => pathname.endsWith(path)

    return(
        <div style = {{width: "100vw", height: !isBelowThreshold? "10vh": '20vh', display: "flex"}}>
            <div style = {{display: "flex", margin: "auto", marginTop: !isBelowThreshold? '2vh' : '10vh'}}>
                <div style = {headerListItem} className = {`tab ${isActive('/arbitrage') ? 'active' : ''}`} onClick = {arbitrage}>
                    <p>Arbitrage</p>
                </div>
                <div style = {headerListItem} className = {`tab ${isActive('/calculator') ? 'active' : ''}`} onClick = {calculator}>
                    <p>Calculator</p>
                </div>
            </div>
            <div style = {{position: 'absolute', right: "0", marginRight: '3vw', marginTop: "2.5vh"}}>
                <button onClick = {logout} className = "primary-button">
                    <p>Log Out</p>
                </button>
            </div>            
            <CheckDimensions setIsHeightLessThanWidth={setIsHeightLessThanWidth} />

        </div>
    )
}