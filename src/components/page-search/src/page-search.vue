<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary" @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MyForm from '@/base-ui/form';

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    MyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定

    const formItems = props.searchFormConfig.formItems;
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = '';
    }
    const formData = ref(formOriginData);

    // 重置
    const handleResetClick = () => {
      // console.log('handleResetClick');
      // for (const key in formOriginData) {
      //   formData.value[key] = formOriginData[key];
      // }
      formData.value = formOriginData;
      emit('resetBtnClick');
    };

    // 搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value);
    };
    return {
      formData,
      handleResetClick,
      handleQueryClick
    };
  }
});
</script>

<style scoped>
.handle-btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
