<template>
  <div class="app">
    <!-- 国际化处理 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    return {
      zhCn
    };
  }
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
