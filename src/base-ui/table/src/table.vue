<template>
  <div class="my-table">
    <el-table :data="tableData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true
    },
    propList: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>