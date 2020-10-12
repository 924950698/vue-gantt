<template>
  <q-layout>
    <q-header class="bg-grey-2 text-black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="mdi-menu"
        />

        <q-toolbar-title>
          质量效率部项目管理 
        </q-toolbar-title>

        <div class="avatar-content"> 
          <div class="user-name" > <span style="font-size: 15px;">当前用户:</span> {{userName}} </div>
          <img class="header-img" :src="userImg" alt="">
          <el-button class="logOut" @click="handleToLoginOut">注销</el-button>
        </div>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item clickable @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon name="mdi-code-tags" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Demo</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/board')">
          <q-item-section avatar>
            <q-icon name="mdi-file-document-box-multiple" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Documentation</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <register @token="handleToRegister" :dialogFormVisible="dialogFormVisible"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import register from './components/Register.vue';
import services from "./services/baseUrl.js";

export default {
  name: "LayoutDefault",
  components: { register },

  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      this.userName = user.userName;
      this.userImg = user.userImg;
    }
    const token = localStorage.getItem('token');
    if(!token) {
      this.dialogFormVisible = true;
    }
  },

  data() {
    return {
      leftDrawerOpen: false,
      userName: null,
      userImg: null,
      dialogFormVisible: false,
    };
  },

  methods: {
    
    handleToRegister(userObj) {
      console.log("eee", userObj);
      this.userName = userObj.userName;
      this.userImg = userObj.userImg;
      this.$root.$emit('eventName');
      this.dialogFormVisible = false;
    },

    handleToLoginOut() {
      this.axios.get(services.logout).then((res) => {
        if(res.data) {
          const data = res.data;
          if(data.status === 200) {
            localStorage.clear();
            this.dialogFormVisible = true;
            this.$root.$emit('logout');
            this.userName = null;
            this.userImg = null;
          }
        } else {
          console.log('logout接口调用失败！')
        }
      })
    },

  }
};
</script>

<style>

  .avatar-content {
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: relative;
  }

  .avatar-content:hover .logOut {
    display: block;
  }

  .header-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .user-name {
    margin-right: 15px;
  }

  .logOut {
    display: none;
    width: 100%;
    position: absolute;
    top: 25px;
    text-align: center;
    background-color: #fff;
  }

</style>
