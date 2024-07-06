export default function Footer() {
    return(
        <div style = {{width: '100vw', borderTop: '1px solid #555555dd', display: 'flex', justifyContent: 'space-between'}}>
            <div style = {{marginLeft: '20vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', gap: '.5em', width: '15vw'}}>
                <button className="footer-button" style = {{fontSize: '.8em'}}><p>Blog</p></button>
                <button className="footer-button" style = {{fontSize: '.8em'}}><p>Image Licenses</p></button>
                <button className="footer-button" style = {{fontSize: '.8em'}}><p>Terms Of Use</p></button>
                <div style = {{marginBottom: '2em'}} />
            </div>
            <div style = {{marginRight: '20vw', marginTop: '2vh', display: 'flex', flexDirection: 'column', gap: '.5em', width: '15vw', textAlign: 'center'}}>
                <p className="footer-text" style = {{fontSize: '.8em'}}>Product by Gamer Coach LLC</p>
                <p className="footer-text" style = {{fontSize: '.8em'}}>Support at info@guaranteedgambles.com</p>
            </div>
        </div>
    )
}
