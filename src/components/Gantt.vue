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
    <el-button type="text" @click="dialogFormVisible = true, form={}, modalTitle='新增' ">增加需求 Dialog</el-button>
    <el-dialog :title="modalTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input
            v-model="form.id"
            autocomplete="off"
            style="width: 300px"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.label"
            autocomplete="off"
            style="width: 300px"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input
            v-model="form.user"
            autocomplete="off"
            style="width: 300px"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.start"
              type="date"
              value-format="yyyy-MM-dd HH-mm-ss"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd HH-mm-ss"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="项目类型" :label-width="formLabelWidth">
          <el-input
            v-model="form.proType"
            autocomplete="off"
            style="width: 300px"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="进度" :label-width="formLabelWidth">
          <el-input
            v-model="form.percent"
            autocomplete="off"
            style="width: 300px"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="风险" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.risk"
            autocomplete="off"
            style="width: 300px"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </q-page>
</template>

<style></style>

<script>
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";
import services from "../services/baseUrl.js";
import { getStartDate, rTime } from "../utils/utils.js";
import { AddGannt } from './AddGannt.vue';
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
const jiraLink='http://jira.dev.aixuexi.com/browse/';
const link ='';

let tasks = [];

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

var vm = {
  name: "Gantt",
  components: {
    GanttElastic,
    GanttHeader,

  },
  data() {
    var self = this;
    return {
      modalTitle: '新增',
      link,
      jiraLink,
      tasks,
      options: {
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
          id: -1,
          label: "操作",
          value: "delete",
          width: 50,
          html: true,
          events: {
            click({ data, column }) {
              console.log(data, column)
              self.handleToDetele(data);
            }
          },
          style: {
            "task-list-item-value-wrapper": {
              "border-right": "0px solid #fff!important",
            },
          }
        },
        {
          id: 0,
          label: "",
          value: "edit",
          width: 50,
          html: true,
          events: {
            click({ data, column }) {
              console.log(data, column)
              self.handleToEdit(data);
            }
          },
          style: {
            "task-list-item-value-wrapper": {
              "border-left": "0px solid #fff!important",
            },
          }
        },
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
  },
      dynamicStyle: {},
      lastId: 16,
      // 新增弹窗属性
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        id: null,
        label: '', // 项目名称
        user: '',  // 负责人
        start: '', // 开始时间
        endDate: null, //结束时间
        duration: 14 * 24 * 60 * 60 * 1000, // 时常
        percent: 10, //完成度
        type: '',
        proType:'',
        risk: '', //风险
      },
      value1: '',
    };
  },

  mounted() {
    var _this = this
    this.queyGanttList();
  },

  methods: {
    handleToDetele(data) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('确定');
          const params = { id: data.id};
          this.axios.post(services.destroy, params).then((res) => {
            console.log('删除==》', res);
            if(res.data.data) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.queyGanttList();
            }else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    handleToEdit(rows) {
      this.modalTitle = '编辑';
      this.form = {
        id: rows.id,
        label: rows.label, // 项目名称
        user: rows.user,  // 负责人
        start: this.getDate('yyyy-mm-dd', rows.start),//rows.start, // 开始时间
        endDate: this.getDate('yyyy-mm-dd', rows.endDate), //结束时间
        percent: rows.percent, //完成度
        type: rows.type,
        proType: rows.proType,
        risk: rows.risk, //风险
      };
      this.dialogFormVisible = true;
      console.log( this,'--rows--');
    },


    //转换年月日方法
  getDate(format,str){
    var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSec = oDate.getSeconds();
    return oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay) +' '+ this.getzf(oHour) +':'+ this.getzf(oMin) +':'+this.getzf(oSec);//最后拼接时间
  },

  //补0操作  
  getzf(num){  
    if(parseInt(num) < 10){  
        num = '0'+num;  
    }  
    return num;  
  },

    add() {
      this.dialogFormVisible = false;
      const params = this.form;
      // 新增
      if(this.modalTitle == '新增') {
         this.axios.post(services.add, params).then((res) => {
           console.log('新增==》', res);
          if(res.data) {
            this.queyGanttList();
          }
        })
      } else {
        // 编辑
        this.axios.post(services.update, params).then((res) => {
           console.log('编辑==》', res);
          if(res.data) {
            this.queyGanttList();
          }
        })
      }
    },



    editHandler() {
      var count = 11;
      // setInterval(() => {
      //   count ++;
      //   const params = {"id":count,"label":"5","user":"5","start":"2020-10-04 00-00-00","endDate":"2020-10-05 00-00-00","proType":"5","percent":"5","risk":"5"}
      //   this.axios.post(services.add, params).then((res) => {
      //       console.log('编辑==》', res);
      //       if(res.data) {
      //         this.queyGanttList();
      //       }
      //     })
      // }, 1000);
    },

    queyGanttList() {
      this.tasks= [];
      this.axios.get(services.queryGanttList).then((res) => {
        if (res && res.data) {
          const data = res.data.data;
          data.map((item) => {
            if(item.start) {
                item.start = getDate(24 * getStartDate(item.start));
            }
            if(item.endDate) {
                item.endDate = getDate(24 * getStartDate(item.endDate));
            }
            if(item.endDate && item.start ) {
              item.duration = item.endDate - item.start;
            } else {
              item.duration = 0;
            }
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
            item.edit = `<a style="color:blue; cursor:pointer;">编辑</a>`;
            item.delete = `<a style="color:blue; cursor:pointer;">删除</a>`;
            this.tasks.push(item);
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

export default vm;
</script>
