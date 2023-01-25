<template>
  <div class="page-content">
    <my-table
      :tableData="dataList"
      v-bind="contentTableConfig"
      :totalCount="totalCount"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="btnName && isCreate" type="primary" size="small">{{
          btnName
        }}</el-button>
        <el-button :icon="RefreshRight"></el-button>
      </template>
      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable || scope.row.status ? 'primary' : 'danger'"
          plain
          >{{
            scope.row.enable || scope.row.status ? '启用' : '禁用'
          }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler">
          <el-button v-if="isUpdate" :icon="Edit" link>编辑</el-button>
          <el-button v-if="isDelete" :icon="Delete" link>删除</el-button>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot
        ></template>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import MyTable from '@/base-ui/table';
import { Edit, RefreshRight, Delete } from '@element-plus/icons-vue';
import { usePermission } from '@/hooks/usePermission';

export default defineComponent({
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    btnName: {
      type: String,
      dafault: ''
    }
  },
  setup(props) {
    const store = useStore();

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isQuery = usePermission(props.pageName, 'query');
    const isDelete = usePermission(props.pageName, 'delete');
    console.log(isDelete);
    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();
    //  3.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    );
    const totalCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    );
    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false;
        if (item.slotName === 'createAt') return false;
        if (item.slotName === 'updateAt') return false;
        if (item.slotName === 'handler') return false;

        return true;
      }
    );
    return {
      Edit,
      RefreshRight,
      Delete,
      dataList,
      getPageData,
      totalCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
    };
  }
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
