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
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}
let projects = [
  {
    id: 1,
    label: '<a href="https://www.baidu.com" target="_blank" style="color:blue;">需求：直播课</a>',
    user:'John Doe',
    start: getDate(-24 * 5),
    endDate: '2020-07-21',
    duration: 14 * 24 * 60 * 60 * 1000,
    percent: 85,
    type: "milestone",
    proType: "产品需求",
    risk: "风险预警xxx",
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0"
      }
    }
    //collapsed: true,

  },
  {
    id: 2,
    label: "开发排期",
    user:
      'Peter Parker',
    parentId: 1,
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "milestone",
    collapsed: true,
    style: {
      base: {
        fill: "#1EBC61",
        stroke: "#0EAC51"
      }
    }
  },
  {
    id: 3,
    label: "前端",
    user:
      'John Wayne',
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 100,
    type: "task"
  },
  {
    id: 4,
    label: "后端",
    user:
      'Clark Kent',
    parentId: 2,
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "task",
    dependentOn: [3]
  },
  {
    id: 5,
    label:
      "Android",
    user:
      'Austin Powers',
    parentId: 2,
    start: getDate(0),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 10,
    type: "milestone",
    style: {
      base: {
        fill: "#0287D0",
        stroke: "#0077C0"
      }
    }
  },
  {
    id: 6,
    label: "iOS",
    user:
      'Mario Bros',
    parentId: 2,
    start: getDate(24),
    duration: 1 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: "task",
    collapsed: true,
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D"
      }
    }
  },
  {
    id: 7,
    label: "测试排期",
    user:
      'Knight Rider',
    parentId: 1,
    dependentOn: [6],
    start: getDate(24 * 2),
    duration: 4 * 60 * 60 * 1000,
    percent: 20,
    type: "task",
    collapsed: true
  },
  {
    id: 8,
    label: "直播课 - 模块1",
    user:
      'Johhny Bravo',
    parentId: 7,
    dependentOn: [7],
    start: getDate(24 * 3),
    duration: 1 * 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task"
  },
  {
    id: 9,
    label:
      "直播课 - 模块2",
    user:
      'Dexter\'s Laboratory',
    parentId: 7,
    dependentOn: [8, 7],
    start: getDate(24 * 4),
    duration: 4 * 60 * 60 * 1000,
    percent: 20,
    type: "task",
    style: {
      base: {
        fill: "#8E44AD",
        stroke: "#7E349D"
      }
    }
  },
  {
    id: 10,
    label: "current task",
    user:
      'Johnattan Owens',
    start: getDate(24 * 5),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task"
  },
  {
    id: 11,
    label: "test task",
    user:
      'Johnattan Owens',
    start: getDate(24 * 6),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task"
  },
  {
    id: 12,
    label: "test task",
    user:
      'Johnattan Owens',
    start: getDate(24 * 7),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task",
    parentId: 11
  },
  {
    id: 13,
    label: "test task",
    user:
      'Johnattan Owens',
    start: getDate(24 * 8),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task"
  },
  {
    id: 14,
    label: "test task",
    user:
      'Johnattan Owens',
    start: getDate(24 * 9),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task"
  },
  {
    id: 15,
    label: "test task",
    user:
      'Johnattan Owens',
    start: getDate(24 * 16),
    duration: 24 * 60 * 60 * 1000,
    percent: 0,
    type: "task"
  }
];
let tasks = [];
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
      {
        id: 3,
        label: "负责人",
        value: "user",
        width: 130,
        html: true,
      },
      {
        id: 3,
        label: "开始时间",
        value: (task) => dayjs(task.start).format("YYYY-MM-DD"),
        width: 78,
      },
      {
        id: 4,
        label: "结束时间",
        value: (task) => dayjs(task.endDate).format("YYYY-MM-DD"),
        width: 78,
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
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

export default {
  name: "Gantt",
  components: {
    GanttElastic,
    GanttHeader,
  },
  data() {
    return {
      tasks,
      options,
      dynamicStyle: {},
      lastId: 16,
    };
  },
  mounted() {
    this.queyGanttList();
  },
  methods: {
    queyGanttList() {
      this.axios.get(services.queryGanttList).then((res) => {
        if (res && res.data) {
          const data = res.data;
          data.map((item) => {
            item.start = getDate(24 * getStartDate(item.startDate));
            item.endDate = getDate(24 * getStartDate(item.endDate));
            item.duration = item.endDate - item.startDate +24*60*60*1000;
            item.proType = actionsType.get(item.proType);
            if(item.link){
                item.label = `<a href=${item.link} target="_blank" style="color:blue;">${item.label}</a>`;
                item.style = {
                    base: {
                    fill: "#0287D0",
                    stroke: "#0077C0",
                    },
                };
            }
        
            item.type = "milestone";
          
            
            delete item.link;
            delete item.startDate;
            this.tasks.push(item);
          });
        }
      });
    },
    addTask() {
        this.tasks.push({
          id: this.lastId++,
          label:
            '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
          user:
            '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
          start: getDate(24 * 3),
          duration: 1 * 24 * 60 * 60 * 1000,
          percent: 50,
          type: "project",
        });
    },
    tasksUpdate(tasks) {
        this.tasks = tasks;
    },
    optionsUpdate(options) {
        // this.options = options;
    },
    styleUpdate(style) {
        this.dynamicStyle = style;
    },
  },
};
</script>
