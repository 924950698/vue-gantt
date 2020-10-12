<template>
  <q-page class="q-pa-sm" style="width:100%; height: 100%; display: flex; justify-content: center;">

    <el-dialog title="登录" width="500px" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input style="width: 300px" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input style="width: 300px" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPass">
          <el-input style="width: 300px" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item>
        
          <el-button style="width: 300px" type="primary" :loading="loginState" @click="submitForm('ruleForm')">登录中</el-button>

          <!-- <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button> -->

        </el-form-item>
      </el-form>
    </el-dialog>

  </q-page>
</template>

<script>
  import services from "../services/baseUrl.js";

  export default {
    name: 'register',
    props: {
      dialogFormVisible:{
        type: Boolean,
        default: true
      }
    },

    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginState: false,
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      submitForm() {
        // this.dialogFormVisible = false;
        this.loginState = true;
        const params = {
          username: 'test1',
          password: '1234',
        }
        this.axios.post(services.login, params).then((res) => {// 编辑
          this.openFullScreen(false);
          if(res.data) {
            this.$message({
              message: '编辑成功！',
              type: 'success'
            });
            this.queryGanntList();
          }
        })
        .catch(error => {
          this.openFullScreen(false);
          this.$message.error('编辑失败！');
        })
      }
    }
  }
</script>
