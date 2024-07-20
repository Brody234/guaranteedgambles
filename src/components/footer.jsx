'use client'
import { useRouter } from "next/navigation"

export default function Footer() {
    const router = useRouter()
    const tou = () =>{
        router.push('/termsofuse')
    }
    const imgLis = () =>{
        router.push('/imagelicenses')
    }
    const aff = () =>{
        router.push('/partners')
    }
    const affTos = () => {
        router.push('/partnertos')
    }
    const privacy = () =>{
        router.push('/privacypolicy')
    }

    return(
        <div style = {{width: '100vw', borderTop: '1px solid #555555dd', display: 'flex', justifyContent: 'space-between'}}>
            <div style = {{marginLeft: '20vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', gap: '.5em', width: '15vw'}}>
                <button className="footer-button" style = {{fontSize: '.8em'}}><p>Blog</p></button>
                <button className="footer-button" style = {{fontSize: '.8em'}} onClick = {imgLis}><p>Image Licenses</p></button>
                <button className="footer-button" style = {{fontSize: '.8em'}} onClick = {tou}><p>Terms Of Use</p></button>
                <button className="footer-button" style = {{fontSize: '.8em'}} onClick = {aff}><p>Partners</p></button>
                <div style = {{marginBottom: '2em'}} />
            </div>
            <div style = {{marginRight: '20vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', gap: '.5em', width: '15vw', textAlign: 'center'}}>
                <p className="footer-text" style = {{fontSize: '.8em'}}>Product by Gamer Coach LLC</p>
                <p className="footer-text" style = {{fontSize: '.8em'}}>Support at info@guaranteedgambles.com</p>
                <button className="footer-button" style = {{fontSize: '.8em'}} onClick = {privacy}><p>Privacy Policy</p></button>
                <button className="footer-button" style = {{fontSize: '.8em'}} onClick = {affTos}><p>Partner TOS</p></button>

            </div>
        </div>
    )
}
