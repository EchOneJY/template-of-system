const formatDate = (date, type) =>{
    var year = date.getFullYear();//年
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;//月
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();//日
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();//时
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();//分
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();//秒
    var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds() //毫秒
    if (type == 1) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    } else if(type == 2){
        return year+""+month+""+day+""+hour+""+minutes+""+seconds;
    }else if(type ==3){
        return year + "-" + month + "-" + day;
    }else{
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}

const mutils = {
    'formatDate':formatDate,
 }
 
 module.exports = mutils;