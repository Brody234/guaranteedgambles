'use client'
import React, { useState } from 'react';

export default function Calc() {
    const [odds, setOdds] = useState({
        american: 0,
        percent: 0,
        decimal: 0,
        fraction: 0
    });

    const boxText = {
        color: 'black'
    };

    const updateOdds = (property, value) => {
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
            console.log('Enter key pressed');
            runHardOdds(property);
        }
    };

    const truncateValue = (value, precision) => {
        if (!value || isNaN(value)) return ''; // Handle empty or non-numeric values
        return parseFloat(value).toFixed(precision);
    };

    return (
        <div style={{ height: '100vh', width: '100vw', alignContent: 'center', alignItems: 'center', margin: 'auto' }}>
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
                        />
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ margin: 'auto' }}>
                        <p style = {boxText}>Fraction</p>
                        <input
                            type="number"
                            value={odds.fraction}
                            onChange={(e) => updateOdds('fraction', e.target.value)}
                        />
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <p style = {boxText}>Percent</p>
                        <input
                            type="number"
                            value={truncateValue(odds.decimal, 2)}
                            onChange={(e) => updateOdds('percent', e.target.value)}
                        />
                    </div>
                </div>
            </div>
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

function percentToAll(percent) {
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
    if (decimal <= 1) {
        return 0;
    }

    let american = 0;
    if (decimal > 1) {
        american = Math.round((decimal - 1) * 100);
    } else {
        american = Math.round(-100 / (decimal - 1));
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