<template>
<div>
  <el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="form">
           <el-form-item label="id" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" style="width: 300px"  maxlength=10 show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="form.label" autocomplete="off" style="width: 300px"  maxlength=10 show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="负责人" :label-width="formLabelWidth">
            <el-input v-model="form.user" autocomplete="off" style="width: 300px"  maxlength=10 show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="开始时间" :label-width="formLabelWidth">
             <div class="block">
              <el-date-picker
                v-model="form.start"
                type="date"
                value-format="yyyy-MM-dd HH-mm-ss"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="结束时间" :label-width="formLabelWidth">
             <div class="block">
              <el-date-picker
                v-model="form.endDate"
                type="date"
                value-format="yyyy-MM-dd HH-mm-ss"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item label="项目类型" :label-width="formLabelWidth">
           <el-dropdown @command="handleCommand" trigger="click" :hide-on-click="true">
               <span class="el-dropdown-link" color="#ccc!important">
                <span v-if="form.proType">{{showProType}}</span>
                <span v-else>请选择类型<i class="el-icon-arrow-down el-icon--right"></i></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">技术驱动</el-dropdown-item>
                <el-dropdown-item command="2">业务驱动</el-dropdown-item>
                <el-dropdown-item command="0">无</el-dropdown-item>
              </el-dropdown-menu> 
            </el-dropdown>
          </el-form-item>
          <el-form-item label="进度" :label-width="formLabelWidth">
            <el-input v-model="form.percent" type="number" autocomplete="off" style="width: 300px"  maxlength=3 show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="风险" :label-width="formLabelWidth">
            <el-input v-model="form.risk" autocomplete="off" style="width: 300px"  maxlength=10 show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
</div>
   
</template>

<script>
  export default {
    props: {
      dialogFormVisible:{
        type: Boolean,
        default: false
      }
     },

    data() {
      return {
       form: {
        id: null,
        label: '', // 项目名称
        user: '',  // 负责人
        start: '', // 开始时间
        endDate: null, //结束时间
        duration: 14 * 24 * 60 * 60 * 1000, // 时常
        percent: 10, //完成度
        type: '',
        proType: '', 
        risk: '', //风险
      },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
