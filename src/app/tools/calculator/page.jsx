'use client'
import Footer from '@/components/footer';
import Header from '@/components/header';
import React, { useEffect, useState } from 'react';

export default function Calc() {
    
    return (
        <div style={{ width: '100vw' }}>
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

function americanToAll(american) {
    if(american < 100 && american > -100){
        return {
            fraction: 0,
            percent: 0,
            decimal: 0,
            american: american    
        }
    }
    const percent = americanToPercent(american)
    const decimal = americanToDecimal(american)
    const fraction = americanToFraction(american)

    return {
        fraction: fraction,
        percent: percent,
        decimal: decimal,
        american: american
    }
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

function percentToAll(percent) {
    if(percent <= 0 || percent > 1){
        return {
            fraction: 0,
            percent: percent,
            decimal: 0,
            american: 0    
        }
    }

    const american = percentToAmerican(percent)
    const decimal = percentToDecimal(percent)
    const fraction = percentToFraction(percent)

    return {
        fraction: fraction,
        percent: percent,
        decimal: decimal,
        american: american
    }
}

function decimalToAll(decimal) {
    if(decimal < 1){
        return {
            fraction: 0,
            percent: 0,
            decimal: decimal,
            american: 0    
        }
    }

    const american = decimalToAmerican(decimal)
    const percent = decimalToPercent(decimal)
    const fraction = decimalToFraction(decimal)

    return {
        fraction: fraction,
        percent: percent,
        decimal: decimal,
        american: american
    }
}

function fractionToAll(fraction) {
    if(fraction < 0){
        return {
            fraction: fraction,
            percent: 0,
            decimal: 0,
            american: 0    
        }
    }

    const american = fractionToAmerican(fraction)
    const percent = fractionToPercent(fraction)
    const decimal = fractionToDecimal(fraction)

    return {
        fraction: fraction,
        percent: percent,
        decimal: decimal,
        american: american
    }
}

function americanToPercent(american) {
    const decimal = americanToDecimal(american)
    const percent = decimalToPercent(decimal)
    return percent
}

function americanToDecimal (american) {
    if(Math.abs(american) < 100){
        return 0
    }
    let decimal = 0
    if(american > 0){
        decimal = (american/100)+1

    }
    else{
        decimal = (-100/american)+1
    }
    return decimal
}

function americanToFraction(american) {
    const decimal = americanToDecimal(american)
    const fraction = decimalToFraction(decimal)
    return fraction
}

function decimalToAmerican(decimal) {
    if(decimal == 2){
        return 100 
    }
    if (decimal <= 1) {
        return 0;
    }

    let american = 0;
    if (decimal > 1) {
        american = Math.round((decimal - 1) * 100);
    } else {
        american = Math.round(-100 / (decimal - 1));
    }

    if(decimal > 2){
        american = ((decimal-1)*100)

    }
    else{
        american = (-100/(decimal-1))
    }


    return american;
}

function decimalToFraction(decimal) {
    return decimal - 1
}

function decimalToPercent (decimal) {
    const prob = 1/decimal
    return prob
}

function fractionToDecimal(fraction){
    return fraction+1
}

function fractionToPercent(fraction){
    const decimal = fractionToDecimal(fraction)
    return decimalToPercent(decimal)
}

function fractionToAmerican(fraction){
    const decimal = fractionToDecimal(fraction)
    return decimalToAmerican(decimal)
}

function percentToDecimal(percent){
    return 1/percent
}

function percentToAmerican(percent){
    const decimal = percentToDecimal(percent)
    return decimalToAmerican(decimal)
}

function percentToFraction(percent){
    const decimal = percentToDecimal(percent)
    return decimalToFraction(decimal)
}

const fractionToString = (decimal) => {
    // Handle edge cases
    if (decimal === '' || isNaN(decimal)) return '0/1';

    // Convert decimal to fraction logic
    // For simplicity, assuming a basic conversion here
    const tolerance = 1.0E-6;
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let b = decimal;
    do {
        let a = Math.floor(b);
        let aux = h1; h1 = a * h1 + h2; h2 = aux;
        aux = k1; k1 = a * k1 + k2; k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

    return `${h1}/${k1}`;
};

function parseFraction(str) {
    if (!str) {
        return 0; // Return 0 if str is undefined or null
    }

    const regex = /^(\d+)\/(\d+)$/;
    const match = str.match(regex);
    
    if (match) {
        const numerator = parseInt(match[1]);
        const denominator = parseInt(match[2]);
        
        return numerator / denominator;
    } else {
        return 0;
    }
}