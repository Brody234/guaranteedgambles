import Footer from "@/components/footer";
import lebron from "../../images/lebronclear2.png"
import messi from '../../images/messiclear.png'
import Image from "next/image";

export default function ImageLicenses() {
    return(
        <div className="main-container">
            <h1>Image Licenses</h1>
            <p>This site uses some images obtained from Wikipedia Commons, which have a creative commons license. Currently, these images are that of Lebron James and Lionel Messi.</p>
            <h2>Lebron James</h2>
            <p>Page URL</p>
            <a>https://commons.wikimedia.org/wiki/File:LeBron_James_(51959977144)_(cropped).jpg</a>
            <p>File URL</p>
            <a>https://upload.wikimedia.org/wikipedia/commons/d/d4/LeBron_James_%2851959977144%29_%28cropped%29.jpg</a>
            <p>Attribution</p>
            <p><a href="https://commons.wikimedia.org/wiki/File:LeBron_James_(51959977144)_(cropped).jpg">Erik Drost</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons</p>
            <p>Embed</p>
            <a title="Erik Drost, CC BY 2.0 &lt;https://creativecommons.org/licenses/by/2.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:LeBron_James_(51959977144)_(cropped).jpg"><img width="256" alt="LeBron James (51959977144) (cropped)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/LeBron_James_%2851959977144%29_%28cropped%29.jpg/256px-LeBron_James_%2851959977144%29_%28cropped%29.jpg?20220326105657" /></a>
            <p>License</p>
            <p>This file is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license.
                You are free:
                to share – to copy, distribute and transmit the work
                to remix – to adapt the work
                Under the following conditions:
                attribution – You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
                share alike – If you remix, transform, or build upon the material, you must distribute your contributions under the same or compatible license as the original.
            </p>
            <p>We modified this image of Lebron to remove the background and made his legs semi transparent. Feel free to download this image and use in accordance with the license. The outer glow seen on some of our pages is a drop shadow made with css styling and not modification to the image.</p>
            <Image src = {lebron}/>
            <h2>Lionel Messi</h2>
            <p>Page URL</p>
            <a>https://commons.wikimedia.org/wiki/File:Lionel_Messi_in_2018.jpg</a>
            <p>File URL</p>
            <a>https://upload.wikimedia.org/wikipedia/commons/6/6c/Lionel_Messi_in_2018.jpg</a>
            <p>Attribution</p>
            <p><a href="https://commons.wikimedia.org/wiki/File:Lionel_Messi_in_2018.jpg">Кирилл Венедиктов</a>, CC BY-SA 3.0 GFDL, via Wikimedia Commons</p>
            <p>Embed</p>
            <a title="Кирилл Венедиктов, CC BY-SA 3.0 GFDL, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Lionel_Messi_in_2018.jpg"><img width="256" alt="Lionel Messi in 2018" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Lionel_Messi_in_2018.jpg/256px-Lionel_Messi_in_2018.jpg?20200828022730" /></a>            <p>License</p>
            <p>This file is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license.
            You are free:
            to share – to copy, distribute and transmit the work
            to remix – to adapt the work
            Under the following conditions:
            attribution – You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
            share alike – If you remix, transform, or build upon the material, you must distribute your contributions under the same or compatible license as the original.</p>
            <p>We modified this image of Messi to remove the background. Feel free to download this image and use in accordance with the license. The outer glow seen on some of our pages is a drop shadow made with css styling and not modification to the image.</p>
            <Image src = {messi} alt = "Messi image"/>

            <Footer />
        </div>
    )
}
