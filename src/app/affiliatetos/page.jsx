'use client'
import { useRouter } from "next/navigation"

export default function AffTOS(){
const router = useRouter()


return(
    <div className="main-container">
        <button className="primary-button" onClick = {()=>{router.back()}}><p>Go Back</p></button>
            <h1  id="h.uv5xunuva0hf">
                <span >
                    Affiliate Terms of Service
                </span>
            </h1>
            <h2  id="h.8bvi4mm58gdz">
                <span >
                    Introduction
                </span>
            </h2>
            <p >
                <span >Welcome to the Affiliate Program of Guaranteed Gambles, operated by Gamer Coach LLC. By joining our program and promoting our products/services, you agree to abide by the following terms and conditions. Please read them carefully.</span>
            </p>
            <h2  id="h.s7avgy9e48m7">
                <span >Commission Structure</span>
            </h2>
            <p >
                <span >As an affiliate, you will earn a commission based on a percentage of the sales generated through your unique affiliate link. The commission rate is specified at the time of your registration. For example, if your commission rate is 50%, you will receive 50% of the total sales amount from customers referred by you.</span>
            </p>
            <h2  id="h.liz1k9j2lql6">
                <span >Refund Policy</span>
            </h2>
            <p >
                <span >If a sale is refunded, no commission will be paid out for that sale.</span>
            </p>
            <h2  id="h.w4nnf3t4kgmw">
                <span >Approval and Payouts</span>
            </h2>
            <p >
                <span >There is a 30-day wait period for sales to be approved. After this period, you can request a payout to your PayPal account. You may request other forms of payout; however, depending on the form you request, we may ask you to find another form.</span>
            </p>
            <h2  id="h.8nxx2qghgtg2">
                <span >Tax Forms</span>
            </h2>
            <p >
                <span >
                    Prior to receiving any payouts, you will be required to submit the necessary tax forms to us. These requirements may change depending on where you live and the total value of commissions you are receiving. It is your responsibility to ensure that the tax forms are accurate and submitted on time.
                </span>
            </p>
            <h2  id="h.55qoyf5p394j">
                <span >
                    Agreement
                </span>
            </h2>
            <p >
                <span >
                    By marketing for Guaranteed Gambles, you acknowledge that you have read and agreed to these Terms of Service.
                </span>
            </p>
            <p >
                <span >
                    If you have any questions or concerns, please contact us at info@guaranteedgambles.com.
                </span>
            </p>
            <p >
                <span >
                    Thank you for being a part of our affiliate program.
                </span>
            </p>
            <p >
                <span >
                    Gamer Coach LLC GuaranteedGambles.com
                </span>
            </p>
        </div>)}