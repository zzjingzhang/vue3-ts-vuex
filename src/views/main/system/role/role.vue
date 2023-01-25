<template>
  <div class="role">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig" />
    </div>
    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" page-name="role" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    };
  }
});
</script>

<style scoped></style>
