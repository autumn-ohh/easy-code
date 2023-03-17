<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="生成代码">
      <generate-code/>
    </el-tab-pane>
    <el-tab-pane label="类型映射">
      <type-mapper/>
    </el-tab-pane>
    <el-tab-pane label="模板">
      <template-page/>
    </el-tab-pane>
    <el-tab-pane label="全局配置">
      <global-config/>
    </el-tab-pane>
    <el-tab-pane label="关于">
      <about/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import about from "./about.vue";
import generateCode from "./generateCode.vue";
import globalConfig from "./globalConfig.vue";
import templatePage from "./template.vue";
import typeMapper from "./typeMapper.vue";

export default {
  name: 'index',
  components: {about, generateCode, globalConfig, templatePage, typeMapper},
  data() {
    return {
      tabPosition: 'left'
    };
  },
};
</script>

<style lang="less" scoped></style>
