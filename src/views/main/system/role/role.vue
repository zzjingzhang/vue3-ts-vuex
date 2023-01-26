<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      page-name="role"
      btn-name="新建角色"
      @newBtnClikc="handleAddClick"
      @editBtnClick="handleEditClick"
    />
    <page-modal
      ref="pageModalRef"
      page-name="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menu"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue';
import { useStore } from '@/store';
import { getMenuLeafkeys } from '@/utils/map-menus';
import { ElTree } from 'element-plus';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafkeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [pageModalRef, defaultInfo, handleAddClick, handleEditClick] =
      usePageModal(undefined, editCallback);
    const defaultProps = {
      children: 'children',
      label: 'name'
    };
    const store = useStore();
    const menu = computed(() => store.state.entireMenu);

    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      defaultInfo,
      pageModalRef,
      handleAddClick,
      handleEditClick,
      defaultProps,
      menu,
      otherInfo,
      handleCheckChange,
      elTreeRef
    };
  }
});
</script>

<style scoped lang="less">
.menu-tree {
  padding-left: 24px;
}
</style>
