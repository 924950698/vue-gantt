function getStartDate(startDate) {
    const currentDate = new Date().getTime();  // 获取当前时间戳（毫秒）
    return Math.ceil((startDate - currentDate) / 86400000);   
}


export {
    getStartDate
}