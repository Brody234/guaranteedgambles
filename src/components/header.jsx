'use client'
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/authcontext"

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const { logout } = useAuth()
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
        <div style = {{width: "100vw", height: "10vh", display: "flex"}}>
            <div style = {{display: "flex", margin: "auto"}}>
                <div style = {headerListItem} className = {`tab ${isActive('/arbitrage') ? 'active' : ''}`} onClick = {arbitrage}>
                    <p>Arbitrage</p>
                </div>
                <div style = {headerListItem} className = {`tab ${isActive('/calculator') ? 'active' : ''}`} onClick = {calculator}>
                    <p>Calculator</p>
                </div>
            </div>
            <div style = {{position: 'absolute', marginLeft: "90vw", marginTop: "2.5vh"}}>
                <button onClick = {logout} className = "primary-button">
                    <p>Log Out</p>
                </button>
            </div>            
        </div>
    )
}