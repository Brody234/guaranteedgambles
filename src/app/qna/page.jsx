"use client"
import Image from "next/image";

const qnas = [{
    question: "What is Guaranteed Gambles?",
    answer: "Guaranteed Gambles is a sports betting arbitrage site that allows you to find points where the odds of two betting sites overlap, in a way that you can make profit. We do not handle money."
},
{
    question: "What is arbitrage sports betting?",
    answer: "Arbitrage sports betting is a concept in sports betting where a two book sites have overlapping odds. If two sites favor different teams with +200 odds, you can bet 100 dollars on each site, spending 200 dollars, and whichever site hits will pay you 300 dollars. Arbitrage opportunities like this are hard to find, but when a site is looking for them for you, they become easy."
},
{
    question: "What makes Guaranteed Gambles the best arbitrage site?",
    answer: "I noticed that other arbitrage sites were overcharging for their products. We have a free trial, after which you can simply cancel and we charge $20 dollars a month as opposed to $100 dollars a month."
},
{
    question: "Is there a way to win at sports betting every time?",
    answer: "Yes. Arbitrage sports betting allows you to bet with both teams, so that regardless of who wins you walk away with profit. Normally, this would cause you to lose money, but in rare instances two books have different enough odds that you can bet for a profit."
},
{
    question: "What regions does Guaranteed Gambles support?",
    answer: "Guaranteed Gambles supports arbitrage bets for sports betting sites in the US, UK, AU and EU. Regardless of which region you are from, you can use the site. Additionally, if you travel between these regions you can simply switch the region you search for."
},
{
    question: "Is sport arbtirage profitable?",
    answer: "Yes, extremely. Arbitrage sports betting can have very high profit margins. Most people think that arbitrage is only .1% or mayb 5-10% on a good day. However, while developing and testing this tool, I have found arbitrage opportunities close to 90% profit. Arbitrages are most common while a game is being played."
},
{
    question: "Is arbitrage legal in sports betting?",
    answer: "Arbitrage sports betting is completely legal; however, if you win too much you could end up being banned from a bookmaker's site. To prevent this, mix arbitraging with other bets, don't bet exact numbers, try to round to dollar multiples of 5 or 10 and don't earn too much. Basically, treat it like card counting in a casino, that is the closest equivalent."
},
{
    question: "How to find arbitrage in sports betting?",
    answer: "Use guaranteedgambles.com to find arbitrage in your sports betting. We search all the major sports books in the UK, US, EU, and AU for arbitrage opportunities that would likely be gone by the time you found them if you searched by hand."
},
{
    question: "What is an example of arbitrage in sports betting?",
    answer: "Imagine a random college baseball game is happening tomorrow. Due to the low publicity of the game, Draft Kings has set their odds to a value very different from that of BetMGM. Perhaps MGM says one team has +200 odds, while Draft Kings says the other has +200 odds. If you bet $100 on both teams, one on each site you will make $300 on the site that hits while only paying $200 total. This is a very basic example, arbitrage can also happen when both sites favor the same team as long as their odds are different enough."
}]

export default function Home() {
  return (
    <div>
      <h1>Guaranteed Gambles Q&A</h1>
      <p>Welcome to Guaranteed Gambles Q&A, here you can find all the information about what our site is and how it works, as well as generic sports betting questions. This is a hand written Q&A by the guy who made this website, and not some AI generated BS. I will come back later and make the page look pretty (sorry).</p>
      {qnas.map((val, i)=>{
        return(
            <QnaItem question = {val.question} answer={val.answer} key = {i}/>
        )
      })}
    </div>
    );
}

const QnaItem = ({question, answer})=>{
    return(<div>
        <h2>Question: {question}</h2>
        <p>Answer: {answer}</p>
    </div>)
}