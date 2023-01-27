<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from 'vue';
import { EChartsOption } from 'echarts';
import useEcharts from '../hooks/useEcharts';
const echartRef = ref<HTMLElement>();

// 定义props  // withDefaults 设置默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: '100%',
    height: '360px'
  }
);

onMounted(() => {
  const { setOptions } = useEcharts(echartRef.value!);
  setOptions(props.options);
});
</script>

<style scoped></style>
