function exponentialFormat(num, precision, mantissa = true) {
    return num.toString(precision)
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.array[0][1] < 0.001) return (0).toFixed(precision)
    return num.toStringWithDecimalPlaces(Math.max(precision,2)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function regularFormat(num, precision) {
    if (isNaN(num)) return "NaN"
    if (num.array[0][1] < 0.001) return (0).toFixed(precision)
    return num.toString(Math.max(precision,2))
}

function fixValue(x, y = 0) {
    return x || new MetaNum(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return new MetaNum(0)
    return x.reduce((a, b) => MetaNum.add(a, b))
}
function format(decimal, precision = 4, small=false) {
    small = small || modInfo.allowSmall
    decimal = new MetaNum(decimal)
    let fmt = decimal.toStringWithDecimalPlaces(precision)
    if (decimal.gte(1000000)) {
        if (decimal.lt("10^^10")) {
       return decimal.toExponential(precision)
        }
    }
    if (decimal.lt(1)) {
        let infinisim = MetaNum(1).div(decimal).toStringWithDecimalPlaces(precision)
    if (decimal.eq(0)) {
return "0"
    }
return "(1/"+infinisim+")"
    }
   
  return fmt
}

function formatWhole(decimal) {
    return format(decimal,3)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new MetaNum(x)
    let result = x.toString(precision)
    if (new MetaNum(result).gte(maxAccepted)) {
        result = new MetaNum(maxAccepted - Math.pow(0.1, precision)).toString(precision)
    }
    return result
}