<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isFold ? 'Expand' : 'Fold'" />
    </el-icon>
    <div class="content">
      <my-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import UserInfo from './user-info.vue';
import MyBreadcrumb, { IBreadcrumbsType } from '@/base-ui/breadcrumb';

import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import { pathMapBreadcrums } from '@/utils/map-menus';

export default defineComponent({
  components: {
    UserInfo,
    MyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };

    const store = useStore();

    // 面包屑数据
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrums(userMenus, currentPath);
    });

    return {
      handleFoldClick,
      isFold,
      breadcrumbs
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
