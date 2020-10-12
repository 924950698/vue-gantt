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
          <img class="header-img" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=682895161,2056544872&fm=111&gp=0.jpg" alt="">
          <div class="user-name" @click="handleToRegister"> lxd </div>
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
      <register @token="handleToRegister"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import register from './components/Register.vue';

export default {
  name: "LayoutDefault",
  components: { register },

  data() {
    return {
      leftDrawerOpen: false,

    };
  },
  methods: {
    
    handleToRegister() {
      console.log("eee")
      // this.$router.push("/register");
      this.$root.$emit('eventName', 123)
    }

  }
};
</script>

<style>

  .avatar-content {
    margin: 0 20px;
    border: 1px solid red;
    display: flex;
    align-self: center;
    justify-content: center;
  }

  .header-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .user-name {
    
  }

</style>
