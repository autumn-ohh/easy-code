<template>
  <div class="main">
    <el-form label-width>
      <el-table :data="typeMapperData" border stripe align="center">
        <el-table-column label="匹配模式" prop="matchType">
          <template slot-scope="scope">
            <el-select v-model="scope.row.matchType" filterable>
              <el-option
                v-for="item in matchTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="column类型" prop="columnType">
          <template slot-scope="scope">
            <el-input v-model="scope.row.columnType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="java类型" prop="javaType">
          <template slot-scope="scope">
            <el-select v-model="scope.row.javaType" filterable allow-create>
              <el-option
                v-for="item in javaTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" type="danger" @click="onDel(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button style="width: 100%" @click="onAddMapping">添加映射</el-button>
  </div>
</template>

<script>
import {
  defaultTypeMapperData,
  javaTypeOptions,
  matchTypeOptions,
} from "@/js/dict";

export default {
  name: "typeMapper",
  data() {
    return {
      // 默认数据
      typeMapperData: defaultTypeMapperData,
      javaTypeOptions,
      matchTypeOptions,
    };
  },
  methods: {
    onAddMapping() {
      this.typeMapperData.push({
        matchType: matchTypeOptions[0].value,
        javaType: javaTypeOptions[0].value,
        columnType: "",
      });
    },
    onDel(index) {
      this.typeMapperData.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 0 10%;

  .el-form {
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
  .el-table {
    :deep(th) {
      background-color: #f1f1f1;
      color: #333;
      padding: 8px 0;
    }
    :deep(td) {
      padding: 8px 0;
    }
  }
}
</style>
