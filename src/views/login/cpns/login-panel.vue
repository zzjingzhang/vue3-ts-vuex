<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <user-filled class="icon-style" />
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <iphone class="icon-style" />
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="sign-in-btn" @click="signInHandler"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserFilled, Iphone } from '@element-plus/icons-vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    UserFilled,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPwd = ref(true);
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>();
    const signInHandler = () => {
      console.log('立即登录');
      console.log(loginAccountRef.value);
      loginAccountRef.value?.loginAction(loginAccountRef.value.ruleFormRef);
    };
    return {
      isKeepPwd,
      signInHandler,
      loginAccountRef
    };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .icon-style {
    width: 20px;
    height: 20px;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .sign-in-btn {
    width: 100%;
  }
}
</style>
