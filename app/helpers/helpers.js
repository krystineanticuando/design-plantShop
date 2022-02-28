export default {
    toPhp(amount){
        return `Php ${parseFloat(amount.toString()
            .replace(/[^0-9,.]/gi, '')
        ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        }
}