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
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import type { FormInstance } from 'element-plus';
import { rules } from '../config/account-config';
import localCache from '@/utils/cache';

export default defineComponent({
  setup() {
    const store = useStore();
    const ruleFormRef = ref<FormInstance>();
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    const loginAction = (
      formEl: FormInstance | undefined,
      isKeepPwd: boolean
    ) => {
      console.log('真正登录');
      if (!formEl) return;
      formEl.validate((valid) => {
        console.log(valid);
        console.log(isKeepPwd, 'isKeepPwd');
        if (valid) {
          // 判断是否记住密码
          // 如果选择记住密码，将密码存在本地
          if (isKeepPwd) {
            localCache.setCache('name', account.name);
            localCache.setCache('password', account.password);
          } else {
            localCache.deleteCache('name');
            localCache.deleteCache('password');
          }
          // 开始进行登录
          store.dispatch('login/accountLoginAction', { ...account });
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
