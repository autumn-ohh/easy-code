<template>
  <div class="main">
    <el-form label-width>
      <el-table :data="typeMapperData" border stripe align="center">
        <el-table-column
            label="匹配模式"
            prop="matchType">
          <template slot-scope="scope">
            <el-select
                v-model="scope.row.matchType"
                filterable
                allow-create>
              <el-option
                  v-for="item in matchTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
            label="column类型"
            prop="columnType">
          <template slot-scope="scope">
            <el-input v-model="scope.row.columnType"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            label="java类型"
            prop="javaType">
          <template slot-scope="scope">
            <el-select
                v-model="scope.row.javaType"
                filterable
                allow-create>
              <el-option
                  v-for="item in javaTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button style="width: 100%">添加映射</el-button>
  </div>

</template>

<script>

import {defaultTypeMapperData} from '@/jsonData/typeMapperData'

export default {
  name: 'typeMapper',
  data() {
    return {
      // 默认数据
      typeMapperData: defaultTypeMapperData,
      // 匹配模式下拉选项
      matchTypeOptions: [
        {
          value: 'Regex',
          label: 'Regex'
        }, {
          value: 'Ordinary',
          label: 'Ordinary'
        }
      ],
      // java类型下拉选项
      javaTypeOptions: [
        {
          value: 'java.lang.String',
          label: 'java.lang.String'
        },
        {
          value: 'java.lang.Integer',
          label: 'java.lang.Integer'
        },
        {
          value: 'java.lang.Long',
          label: 'java.lang.Long'
        },
        {
          value: 'java.util.Boolean',
          label: 'java.util.Boolean'
        },
        {
          value: 'java.util.Date',
          label: 'java.util.Date'
        },
        {
          value: 'java.time.LocalDateTime',
          label: 'java.time.LocalDateTime'
        },
        {
          value: 'java.time.LocalDate',
          label: 'java.time.LocalDate'
        },
        {
          value: 'java.time.LocalTime',
          label: 'java.time.LocalTime'
        },
        {
          value: 'java.lang.Short',
          label: 'java.lang.Short'
        },
        {
          value: 'java.lang.Byte',
          label: 'java.lang.Byte'
        },
        {
          value: 'java.lang.Character',
          label: 'java.lang.Character'
        },
        {
          value: 'java.math.BigDecimal',
          label: 'java.math.BigDecimal'
        },
        {
          value: 'java.math.BigInteger',
          label: 'java.math.BigInteger'
        },
        {
          value: 'java.lang.Double',
          label: 'java.lang.Double'
        },
        {
          value: 'java.lang.Float',
          label: 'java.lang.Float'
        },
        {
          value: 'java.lang.String[]',
          label: 'java.lang.String[]'
        },
        {
          value: 'java.util.List',
          label: 'java.util.List'
        },
        {
          value: 'java.util.Set',
          label: 'java.util.Set'
        },
        {
          value: 'java.util.Map',
          label: 'java.util.Map'
        }
      ],
    };
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
}
</style>
