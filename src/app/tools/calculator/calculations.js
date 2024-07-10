export function percentToAll(percent) {
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

export function decimalToAll(decimal) {
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

export function fractionToAll(fraction) {
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

export function americanToPercent(american) {
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

export function decimalToAmerican(decimal) {
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

export const fractionToString = (decimal) => {
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

export function parseFraction(str) {
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

export function americanToAll(american) {
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

