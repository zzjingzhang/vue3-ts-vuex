<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="handle-btn">
          <el-button type="primary">重置</el-button>
          <el-button type="primary">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      realname: '',
      cellphone: '',
      enable: '',
      createAt: ''
    });
    return {
      formData
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
