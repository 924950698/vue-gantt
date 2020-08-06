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
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}

let resdata = [{
    "id": "47381",
    "key": "TOL-124",//需求id
    "fields": {
        "priority": {
            "name": "致命",//优先级
            "id": "1"
        },
        "customfield_11820": "0%",//整体开发进度
        "status": {
            "name": "技术方案评审通过",//状态
        },
        "components": [
            {
                "name": "学习产品"//需求类型
            }
        ],
        "customfield_10211": "2020-08-28T21:41:00.000+0800",//实际上线时间
        "customfield_11300": "2020-08-14",//计划提测时间
        "customfield_11812": "2020-07-30",//启动开发时间
        "customfield_11811": [
            {
                "displayName": "刘孟青",//rd-pc客户端
            }
        ],
        "customfield_11814": "2020-08-17",//测试完成时间
        "customfield_11813": "2020-08-16",//开始测试时间
        "customfield_11818": "20%",//整体项目进度
        "customfield_11819": "0%",//整体测试进度
        "reporter": {
            "displayName": "戴永健",//产品
        },
        "project": {
            "name": "创新业务产研团队",//业务线名称
        },
        "customfield_11633": "14",//测试工时
        "customfield_11632": "15",//后端开发工时
        "customfield_11631": "60",//前端开发工时
        "customfield_11622": {
            "displayName": "黄中博",//UI
        },
        "customfield_11625": [
            {
                "displayName": "高立康",//后端1
            },
            {
                "displayName": "张鹏飞1",//后端2
            }
        ],
        "customfield_11107": "2020-08-31",//计划上线时间
        "customfield_11624": [
            {
                "displayName": "田惠颖",//rd-前端
            }
        ],
        
        "customfield_11627": [
            {
                "displayName": "安雪",//qa1
            },
            {
                "displayName": "邢宁",//qa2
            }
        ],
        "customfield_11626": [
            {
                "displayName": "梁海淼",//android开发1
            },
            {
                "displayName": "刘喆0",//android开发2
            }
        ],
        "customfield_11628": [
            {
                "displayName": "郭玉涛",//iOS开发1
            },
            {
                "displayName": "李凯0",//iOS开发2
             
            }
        ],
        "customfield_11621": "https://www.figma.com/file/a52UaUq9ELdx09wvboC1IA/%E4%B8%8A%E5%8F%B0%E5%8F%91%E8%A8%80?node-id=0%3A1",//ui地址
        "customfield_11613": {
            "value": "产品需求",
        },
        "customfield_11616": "2020-07-27",//技术评审时间
        "customfield_11615": "2020-07-21",//需求评审时间
        "customfield_11617": "2020-08-15T21:41:00.000+0800",//实际提测时间
        "summary": "小组课-上台发言",//需求名称
        "customfield_11604": "http://iwork.gaosiedu.com/pages/viewpage.action?pageId=69861524",//需求文档地址
        "comment": {
            "comments": [
                {
                    "body": "备注",
                }
            ],
        }
    }
}];

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
    optionsUpdate() {
        // this.options = options;
    },
    styleUpdate(style) {
        this.dynamicStyle = style;
    },
  },
};
</script>
