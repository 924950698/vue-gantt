function getStartDate(startDate) {
    const currentDate = new Date().getTime();  // 获取当前时间戳（毫秒）
    return Math.ceil((rTime(startDate) - currentDate) / 86400000);   
}

function rTime(date) {
  var json_date = new Date(date).toJSON();
  return  new Date(json_date).getTime();
  // return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
}


export { getStartDate, rTime };