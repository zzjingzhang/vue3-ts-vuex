<template>
  <div class="app">
    <!-- <h2>{{ $store.state.name }}</h2> -->
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>
    <router-view></router-view>
    <el-button>88888888</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'App',
  components: {
    // ElButton
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less"></style>
