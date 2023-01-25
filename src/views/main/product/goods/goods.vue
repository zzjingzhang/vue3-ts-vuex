<template>
  <div class="goods">
    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" page-name="goods">
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            preview-teleported
          ></el-image>
        </template>
        <template #oldPrice="scope">{{ `￥` + scope.row.oldPrice }}</template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';

import { contentTableConfig } from './config/content.config';

export default defineComponent({
  components: {
    // PageSearch,
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    };
  }
});
</script>

<style scoped></style>
