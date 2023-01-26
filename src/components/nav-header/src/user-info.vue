<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <!-- divided  分割线 -->
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>用户管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import localCache from '@/utils/cache';
export default defineComponent({
  setup() {
    const circleUrl =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

    const store = useStore();
    const userInfo = store.state.login.useInfo;
    const name = computed(() => store.state.login.useInfo.name);
    // 退出登录
    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache('token');
      router.push('/main');
    };
    return {
      circleUrl,
      userInfo,
      name,
      handleExitClick
    };
  }
});
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>
