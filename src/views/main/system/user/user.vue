<template>
  <div class="user">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      />
    </div>
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        page-name="users"
        btn-name="新建用户"
        @newBtnClikc="handleAddClick"
        @editBtnClick="handleEditClick"
      />
    </div>
    <div class="page-modal">
      <page-modal
        ref="pageModalRef"
        page-name="users"
        :defaultInfo="defaultInfo"
        :modalConfig="modalConfigComputed"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    //1. 处理密码的逻辑
    const newCallBack = () => {
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === 'password';
      });
      if (passwordItem) {
        passwordItem.isHidden = false;
      }
    };
    const editCallBack = () => {
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === 'password';
      });
      if (passwordItem) {
        passwordItem.isHidden = true;
      }
    };
    // 2.动态添加角色和部门列表
    const store = useStore();
    const modalConfigComputed = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return {
          title: item.name,
          value: item.id
        };
      });
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return {
          title: item.name,
          value: item.id
        };
      });
      return modalConfig;
    });

    // 3.调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleAddClick, handleEditClick] =
      usePageModal(newCallBack, editCallBack);

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigComputed,
      pageModalRef,
      handleAddClick,
      handleEditClick,
      defaultInfo
    };
  }
});
</script>

<style scoped></style>
