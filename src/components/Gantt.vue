<template>
  <q-page class="q-pa-sm">
    <gantt-elastic
      :options="options"
      :tasks="tasks"
      @tasks-changed="tasksUpdate"
      @options-changed="optionsUpdate"
      @dynamic-style-changed="styleUpdate"
    >
      <gantt-header slot="header"></gantt-header>
    </gantt-elastic>
    <div class="q-mt-md" />
    <q-btn @click="addTask" icon="mdi-plus" label="增加需求" />
  </q-page>
</template>

<style>
</style>

<script>
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";
import services from "../services/baseUrl.js";
import { getStartDate } from "../utils/utils.js";
import qs from 'qs';

// just helper to get current dates  获取当前时间
function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime();
  console.log("ssss",timeStamp)
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}
const jiraLink='http://jira.dev.aixuexi.com/browse/';
const link ='';

let tasks = [
  // {
  //   duration: 1209600000,
  //   endDate: "2020-07-21",
  //   id: 3,
  //   label: "需求：直播课",
  //   percent: 85,
  //   proType: "产品需求",
  //   risk: "风险预警xxx",
  //   start: -120,
  //   type: "milestone",
  //   user: "John Doe",
  // },
  // {
  //   id: 2,
  //   label: '需求：直播课',
  //   user:'John Doe',
  //   start: -120,
  //   endDate: '2020-07-21',
  //   duration: 14 * 24 * 60 * 60 * 1000,
  //   percent: 85,
  //   type: "milestone",
  //   proType: "产品需求",
  //   risk: "风险预警xxx",
  //   style: {
  //     base: {
  //       fill: "#0287D0",
  //       stroke: "#0077C0"
  //     }
  //   }
  // },
];
let options = {
  taskMapping: {
    progress: "percent",
  },
  maxRows: 100,
  maxHeight: 500,
  title: {
    label: "Your project title as html (link or whatever...)",
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: true,
    },
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: false,
    },
    columns: [
      {
        id: 1,
        label: "ID",
        value: "id",
        width: 40,
      },
      {
        id: 2,
        label: "项目",
        value: "label",
        width: 130,
        expander: true,
        html: true,
        // events: {
        //   click({ data, column }) {
        //     alert("description clicked!\n" + data.label);
        //   }
        // }
      },
      // {
      //   id: 3,
      //   label: "优先级",
      //   value: "level",
      //   width: 130,
      //   html: true,
      // },
      {
        id: 4,
        label: "负责人",
        value: "user",
        width: 130,
        html: true,
      },
      {
        id: 5,
        label: "开始时间",
        value: (task) => task.start ? dayjs(task.start).format("YYYY-MM-DD") : "暂无数据",
        width: 78,
      },
      {
        id: 6,
        label: "结束时间",
        value: (task) => task.endDate ? dayjs(task.endDate).format("YYYY-MM-DD") : "暂无数据",
        width: 78,
      },
      {
        id: 7,
        label: "项目类型",
        value: "proType",
        width: 68,
        style: {
          "task-list-header-label": {
            "text-align": "center",
            width: "100%",
          },
          "task-list-item-value-container": {
            "text-align": "center",
            width: "100%",
          },
        },
      },
      {
        id: 8,
        label: "进度%",
        value: "progress",
        width: 55,
        style: {
          "task-list-header-label": {
            "text-align": "center",
            width: "100%",
          },
          "task-list-item-value-container": {
            "text-align": "center",
            width: "100%",
          },
        },
      },
      {
        id: 9,
        label: "风险",
        value: "risk",
        width: 120,
        style: {
          "task-list-header-label": {
            "text-align": "center",
            width: "100%",
            color: "red",
          },
        },
      },
    ],
  },
  locale: {
    name: "en",
    Now: "Now",
    "X-Scale": "Zoom-X",
    "Y-Scale": "Zoom-Y",
    "Task list width": "Task list",
    "Before/After": "Expand",
    "Display task list": "Task list",
  },
};
let actionsType = new Map([
    [1, '产品需求'],
    [2, '技术驱动'],
    [null, '—'],
]); 

let actionsPriority = new Map([
    [1, 'P0'],
    [2, 'P1'],
    [3, 'P2'],
    [4, 'P3'],
    [null, '—'],
]); 

export default {
  name: "Gantt",
  components: {
    GanttElastic,
    GanttHeader,
  },
  data() {
    return {
      link,
      jiraLink,
      tasks,
      options,
      dynamicStyle: {},
      lastId: 16,
    };
  },
  mounted() {
    console.log("mounted==>", this.tasks);
    this.queyGanttList();
  },

  methods: {
     queyGanttList() {
      this.axios.get(services.queryGanttList).then((res) => {
        console.log("res==>", res);
        if (res && res.data) {
          const data = res.data;
          console.log("data==>", data);
          data.map((item) => {
            // if(item.startDate) {
            //     item.start = getDate(24 * getStartDate(item.startDate));
            // }
            // if(item.endDate) {
            //     item.endDate = getDate(24 * getStartDate(item.endDate)); 
            // }
            // if(item.endDate && item.startDate ) {
            //     item.duration = item.endDate - item.startDate;
            // } else {
            //     item.duration = 0;
            // }
            // item.proType = actionsType.get(item.proType);
            // if(item.link){
            //     item.label = `<a href=${item.link} target="_blank" style="color:blue;">${item.label}</a>`;
            //     item.style = {
            //         base: {
            //         fill: "#0287D0",
            //         stroke: "#0077C0",
            //         },
            //     };
            // }
            // item.type = "milestone";
            this.tasks.push(item);
            console.log("接口返回的item==>", item);
          });
        }
      });
    },  
    
    addTask() {

      

        // this.tasks.push({
        //   id: this.lastId++,
        //   label:
        //     '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        //   user:
        //     '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        //   start: getDate(24 * 3),
        //   duration: 1 * 24 * 60 * 60 * 1000,
        //   percent: 50,
        //   type: "project",
        // });
    },
    tasksUpdate(tasks) {
        this.tasks = tasks;
    },
    optionsUpdate() {
        // this.options = options;
    },
    styleUpdate(style) {
        this.dynamicStyle = style;
    },
  },
};
</script>
