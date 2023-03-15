<template>
  <div class="tableComp">
    <el-form :model="form" inline>
      <el-form-item label="数据表名" prop="tableName">
        <el-input v-model="form.tableName" placeholder="数据表名"></el-input>
      </el-form-item>
      <el-form-item label="中文表名" prop="tableNameCn">
        <el-input v-model="form.tableNameCn" placeholder="中文表名"></el-input>
      </el-form-item>
      <el-form-item label="数据库引擎" prop="dbEngine">
        <el-input v-model="form.dbEngine" placeholder="数据库引擎"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="encoded">
        <el-input v-model="form.encoded" placeholder="编码"></el-input>
      </el-form-item>
    </el-form>
    <el-form label-width>
      <el-table :data="tableData" border stripe align="center">
        <el-table-column prop="field" label="字段(Field)">
          <template #default="scope">
            <el-form-item prop="field" v-if="scope.row.editing">
              <el-input v-model="scope.row.field"></el-input>
            </el-form-item>
            <span v-else>{{ scope.row.field }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型(Type)">
          <template #default="scope">
            <el-form-item prop="type" v-if="scope.row.editing">
              <el-select
                v-model="scope.row.type"
                @change="scope.row.length = typeMapping[scope.row.type].length"
              >
                <el-option-group
                  v-for="group in fieldTypeOps"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="key in group.options"
                    :key="key"
                    :label="key"
                    :value="key"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <span v-else>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="length" label="长度(Length)">
          <template #default="scope">
            <el-form-item prop="length" v-if="scope.row.editing">
              <el-input v-model="scope.row.length"></el-input>
            </el-form-item>
            <span v-else>{{ scope.row.length }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isNull" label="允许NULL?">
          <template #default="scope">
            <el-form-item prop="isNull" v-if="scope.row.editing">
              <el-checkbox v-model="scope.row.isNull"></el-checkbox>
            </el-form-item>
            <el-checkbox
              v-else
              v-model="scope.row.isNull"
              disabled
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="primaryKey" label="是否主键">
          <template #default="scope">
            <el-form-item prop="primaryKey" v-if="scope.row.editing">
              <el-select v-model="scope.row.primaryKey">
                <el-option
                  v-for="(value, key) in primaryKeyOps"
                  :key="key"
                  :value="key"
                  :label="value.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{ primaryKeyOps[scope.row.primaryKey]?.label }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="defaultValue" label="默认值">
          <template #default="scope">
            <el-form-item prop="defaultValue" v-if="scope.row.editing">
              <el-input v-model="scope.row.defaultValue"></el-input>
            </el-form-item>
            <span v-else>{{ scope.row.defaultValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="字段说明">
          <template #default="scope">
            <el-form-item prop="comment" v-if="scope.row.editing">
              <el-input v-model="scope.row.comment"></el-input>
            </el-form-item>
            <span v-else>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="150">
          <template #default="scope">
            <el-button
              v-if="!scope.row.editing"
              type="danger"
              size="small"
              @click="onDel(scope.$index)"
            >
              删除
            </el-button>

            <el-button
              v-if="!scope.row.editing"
              type="primary"
              size="small"
              @click="onEdit(scope.row, scope.$index)"
            >
              编辑
            </el-button>
            <el-button
              v-if="scope.row.editing"
              type="danger"
              size="small"
              @click="onCancel(scope.$index)"
            >
              取消
            </el-button>
            <el-button
              v-if="scope.row.editing"
              type="primary"
              size="small"
              @click="onConfirm(scope.row, scope.$index)"
            >
              确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button @click="onAddField" style="width: 100%">添加字段</el-button>
  </div>
</template>

<script>
import { fieldTypeOps, typeMapping, primaryKeyOps } from "../dict";
import { cloneDeep } from "loadsh";
export default {
  props: {
    tableInfo: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    tableInfo: {
      handler: function (newV) {
        const { tableName, tableNameCn, dbEngine, encoded, fieldList } = newV;
        this.form = {
          tableName,
          tableNameCn,
          dbEngine,
          encoded,
        };
        this.tableData = [...fieldList];
      },
      deep: true,
      immediate: true,
    },
    form: {
      handler: function (newV) {
        this.$emit("updateTable", { ...newV, fieldList: this.tableData });
      },
      deep: true,
    },
    tableData: {
      handler: function (newV) {
        this.$emit("updateTable", { fieldList: [...newV], ...this.form });
      },
      deep: true,
    },
  },
  data() {
    return {
      fieldTypeOps,
      typeMapping,
      primaryKeyOps,
      form: {
        tableName: "",
        tableNameCn: "",
        dbEngine: "InnoDb",
        encoded: "utf8",
      },
      tableData: [],
      currentRow: null, // 当前操作行数据
    };
  },
  methods: {
    onDel(index) {
      this.tableData.splice(index, 1);
    },
    onEdit(row, index) {
      if (this.currentRow)
        return this.$message.warning("有编辑中的字段未被确认");
      this.tableData[index].editing = true;
      this.currentRow = cloneDeep(row);
    },
    onCancel(index) {
      const { field, type, length, isNull, primaryKey, defaultValue, comment } =
        this.currentRow;
      this.tableData[index].field = field;
      this.tableData[index].type = type;
      this.tableData[index].length = length;
      this.tableData[index].isNull = isNull;
      this.tableData[index].primaryKey = primaryKey;
      this.tableData[index].defaultValue = defaultValue;
      this.tableData[index].comment = comment;
      this.tableData[index].editing = false;
      this.currentRow = null;
    },
    onConfirm(row, index) {
      const { field, type } = row;
      if (!field) return this.$message.warning("请填写字段名");
      if (!type) return this.$message.warning("请选择数据类型");
      this.tableData[index].editing = false;
      this.currentRow = null;
    },
    // 添加字段
    onAddField() {
      if (this.currentRow)
        return this.$message.warning("有编辑中的字段未被确认");
      const fieldInfo = {
        field: "",
        type: "",
        length: "",
        isNull: false,
        primaryKey: undefined, // None-否 PRI_AUTO-自增主键 PRI_NO_AUTO-非自增主键,
        defaultValue: "",
        comment: "",
        editing: true,
      };
      this.currentRow = cloneDeep(fieldInfo);
      this.tableData.push(fieldInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  :deep(th) {
    background-color: #f1f1f1;
    color: #333;
    padding: 8px 0;
  }
  :deep(td) {
    padding: 8px 0;
  }
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
