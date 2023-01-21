<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig" />
    </div>
    <div class="content">
      <my-table :tableData="userList" :propList="propList">
        <template #enable="scope">
          <el-button type="primary" plain>{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import PageSearch from '@/components/page-search';
import MyTable from '@/base-ui/table';
import { searchFormConfig } from './config/search.config';

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    MyTable
  },
  setup() {
    const store = useStore();

    store.dispatch('system/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    });

    const userList = computed(() => store.state.system.useList);
    const userCount = computed(() => store.state.system.userCount);
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100', slotName: 'name' },
      {
        prop: 'realname',
        label: '真是姓名',
        minWidth: '100',
        slotName: 'realname'
      },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'enable' },
      {
        prop: 'cellphone',
        label: '电话号码',
        minWidth: '100',
        slotName: 'cellphone'
      },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }

      // {
      //   id: '',
      //   name: '',
      //   realname: '',
      //   enable: 'name',
      //   cellphone: '1233',
      //   departmentId: '',
      //   roleId: '',
      //   createAt: '',
      //   updateAt: ''
      // },
    ];

    return {
      searchFormConfig,
      userList,
      userCount,
      propList
    };
  }
});
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
