
// const baseUrl = 'http://jira.dev.aixuexi.com';
// const jiraLogin = baseUrl + "/rest/auth/1/session";
// const getProjects = baseUrl +"/rest/api/2/search";
// const productLine ="TOL"
// const jql = "project+%3D+"+productLine+"+AND+issuetype+%3D+%E9%9C%80%E6%B1%82+ORDER+BY+priority+DESC,+updated+DESC";
// export default {
//   jiraLogin,
//   getProjects,
//   jql
// }

const API_ROOT = require('./baseUrl.js').devServer;
console.log("API_ROOT==>", API_ROOT);
export default {
    info: `${API_ROOT}/rest/auth/1/session`,
}