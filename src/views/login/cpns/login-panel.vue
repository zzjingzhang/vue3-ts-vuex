<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <user-filled class="icon-style" />
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <iphone class="icon-style" />
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
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
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 定义属性
    const isKeepPwd = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    const currentTab = ref<string>('account');

    // 定义方法
    const signInHandler = () => {
      // 账号登录
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(
          accountRef.value.ruleFormRef,
          isKeepPwd.value
        );
      } else {
        console.log('手机登录');
      }
    };
    return {
      isKeepPwd,
      accountRef,
      phoneRef,
      currentTab,
      signInHandler
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
