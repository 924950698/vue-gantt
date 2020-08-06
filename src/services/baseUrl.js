const myUrl = 'http://127.0.0.1:8081/';

const queryGanttList = myUrl + "allJiraProjects";

export default {
    queryGanttList
}

// 前端所有配置放这里
// const baseUrl = () => {
//     return {
//         // 测试环境地址
//          'devServer': '/api',
//         //正式环境地址
//         // 'devServer': window.location.origin+'/contentPath', // '/contentPath'为上下文路径，没有可不写
//     }
// };
// module.exports = baseUrl();