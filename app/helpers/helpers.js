
export default {
     formatDate(date,withtime,date_split)
        {
            return date.getFullYear() + date_split + 
            this.pad(date.getMonth()+1) + date_split + 
            this.pad(date.getDate()) 
            + ( withtime? (" " + 
            this.pad(date.getHours()+8) + ":" + 
            this.pad(date.getMinutes())):'')
        },
    pad(num)
        {
            return ("0" + num).slice(-2); 
        },
    toPhp(amount){
        amount = amount.toString().replace(/[^0-9.]/gi, '')
        return `Php ${parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        }
}