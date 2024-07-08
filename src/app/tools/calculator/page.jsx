'use client'
import Footer from '@/components/footer';
import Header from '@/components/header';
import React, { useEffect, useState } from 'react';
import { fractionToString, parseFraction, americanToAll, decimalToAll, fractionToAll, percentToAll} from './calculations'

export default function Calc() {
    
    return (
        <div className = 'main-container' style={{ width: '100vw' }}>
            <Header />
            <div style = {{width: '100vw', minHeight: '90vh'}}>
                <div style = {{margin: 'auto', width: '40vw', textAlign: 'center'}}>
                    <h1>Odds Conversion Calculator</h1>
                    <div style = {{height: '2vh'}}/>
                    <p>This is a calculator meant to help with odds conversion and other betting calculations. Feel free to try it. Note that it is possible some conversions are not accurate.</p>
                    <div style = {{height: '2vh'}}/>
                </div>
                <Calculator />
            </div>
            <Footer />
        </div>
    );
}

function Calculator (){
    const [odds, setOdds] = useState({
        american: 0,
        percent: 0,
        decimal: 0,
        fraction: 0,
        fractionText: "0/1"
    });

    const boxText = {
        color: 'black'
    };

    useEffect(()=>{
        const fractionValue = fractionToString(odds.fraction)
        updateOdds('fractionText', ""+fractionValue)
    }, [odds.fraction])

    const truncateValue = (value, precision) => {
        if (!value || isNaN(value)) return 0; // Handle empty or non-numeric values

        // Convert value to number and round to the specified precision
        let truncatedValue = parseFloat(value).toFixed(precision);

        // Remove trailing zeros if they exist
        truncatedValue = parseFloat(truncatedValue).toString();

        return truncatedValue;
    };

    const runHardOdds = (property) => {
        switch (property){
            case 'american':
                if(odds.american != '-'){
                    setOdds(americanToAll(odds.american))
                }
                break;
            case 'decimal':
                setOdds(decimalToAll(odds.decimal))
                break;
            case 'fraction':
                setOdds(fractionToAll(odds.fraction))
                break;
            case 'percent':
                setOdds(percentToAll(odds.percent))
                break;
        }
    }

    const handleKeyDown = (e, property) => {
        if (e.key === 'Enter') {
            console.log(odds.fraction);
            runHardOdds(property);
        }
    };

    const updateOdds = (property, value) => {
        if(property == 'fractionText'){
            console.log(value)
            setOdds(prevOdds => ({
                ...prevOdds,
                [property]: value
            }));    
            const decimalValue = parseFraction(value)
            updateOdds('fraction', decimalValue)
    
            return
        }
        let numericValue = parseFloat(value); // or parseInt(value, 10) if integer needed
        if(!numericValue){
            numericValue = 0
        }
        if(value == '-' && property == 'american' || value == '0-'){
            numericValue = '-'
        }
        setOdds(prevOdds => ({
            ...prevOdds,
            [property]: numericValue
        }));
    };

    return(
    <div style={{ height: '60vh', width: '30vw', backgroundColor: 'white', margin: 'auto', borderRadius: '20px', textAlign: 'center' }}>
    <p style={{ ...boxText, paddingTop: '15px' }}>Odds Converter</p>
    <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ margin: 'auto' }}>
            <p style = {boxText}>American</p>
            <input
                type="text"
                value={odds.american}
                onChange={(e) => updateOdds('american', e.target.value)}
                onKeyDown={(e)=>handleKeyDown(e, "american")}
            />
        </div>
        <div style={{ margin: 'auto' }}>
            <p style = {boxText}>Decimal</p>
            <input
                type="number"
                value={truncateValue(odds.decimal, 2)}
                onChange={(e) => updateOdds('decimal', e.target.value)}
                onKeyDown={(e)=>handleKeyDown(e, "decimal")}
            />
        </div>
    </div>
    <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ margin: 'auto' }}>
            <p style = {boxText}>Fraction</p>
            <input
                type="text"
                value={odds.fractionText}
                onChange={(e) => updateOdds('fractionText', e.target.value)}
                onKeyDown={(e)=>handleKeyDown(e, "fraction")}
            />
        </div>
        <div style={{ margin: 'auto' }}>
            <p style = {boxText}>Percent</p>
            <input
                type="number"
                value={truncateValue(odds.percent, 2)}
                onChange={(e) => updateOdds('percent', e.target.value)}
                onKeyDown={(e)=>handleKeyDown(e, "percent")}
            />
        </div>
    </div>
</div>)

}

