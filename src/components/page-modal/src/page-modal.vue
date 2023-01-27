<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      destroy-on-close
      title="新建用户"
      width="30%"
      center
    >
      <my-form v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

import MyForm from '@/base-ui/form';

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    MyForm
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData = ref<any>({
      name: ''
    });
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );

    // 点击确定按钮
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = false;
      console.log('handleConfirmClick');
      // 有值  编辑
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          id: props.defaultInfo.id,
          editData: { ...formData.value, ...props.otherInfo }
        });
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        });
      }
    };

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    };
  }
});
</script>

<style scoped></style>
