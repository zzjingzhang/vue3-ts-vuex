<template>
  <div class="login-account">
    <el-form
      ref="ruleFormRef"
      :model="account"
      :rules="rules"
      label-width="60px"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="account.pwd" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { rules } from '../config/account-config';

export default defineComponent({
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const account = reactive({
      name: '',
      pwd: ''
    });

    const loginAction = (formEl: FormInstance | undefined) => {
      console.log('真正登录');
      if (!formEl) return;
      formEl.validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log('执行登录');
        }
      });
    };

    return {
      account,
      rules,
      ruleFormRef,
      loginAction
    };
  }
});
</script>

<style scoped></style>
