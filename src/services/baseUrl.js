import { gannt } from "../constant/network";

// const myUrl = 'http://192.168.0.103:8081/';

// const queryGanttList = myUrl + "allJiraProjects";

// const myUrl = 'http://192.168.7.50:7001/';

const myUrl = 'http://192.168.0.100:7002/';

const queryGanttList = myUrl + gannt.getLists; 
const deleteGannt = myUrl + gannt.delete;
const add = myUrl + gannt.created;
const update = myUrl + gannt.update;
const destroy = myUrl + gannt.destroy;

export default {
    queryGanttList,
    deleteGannt,
    add,
    update,
    destroy,
}