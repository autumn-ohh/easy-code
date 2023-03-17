<template>
  <div class="main">
    <el-tabs v-model="activeName" type="border-card">

      <el-tab-pane label="表信息" name="tableInfo">
        <el-tabs
            v-model="tableActive"
            type="card"
            addable
            :closable="tableTabs.length > 1"
            @edit="handleTabsEdit"
        >
          <el-tab-pane
              v-for="tab in tableTabs"
              :key="tab.name"
              :label="tab.label"
              :name="tab.name"
              lazy
          >
            <tableComp
                :tableInfo="currentTableInfo"
                @updateTable="onTableUpdate"
            />
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="识别MySQL建表代码" name="sqlCode">
        <el-form :model="codeForm">
          <el-form-item>
            <el-input
                v-model="codeForm.sql"
                type="textarea"
                class="sql-area"
                resize="none"
                rows="12"
            ></el-input>
            <el-button
                type="primary"
                style="position: absolute; right: 10px; top: 10px"
            >
              识别
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

    <!-- 生成信息 -->
    <div style="margin-top: 25px"></div>
    <el-form :model="generateForm" label-width="80px">

      <el-row>
        <el-col :span="12">
          <el-form-item label="包名" prop="packageName">
            <el-input v-model="generateForm.packageName" placeholder="包名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生成路径" prop="packageName">
            <el-input v-model="generateForm.path" placeholder="包名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin-top: 25px"></div>

      <el-row>
        <el-col :span="12">
          <el-form-item label="去除前缀" prop="packageName">
            <el-input v-model="generateForm.removePre" placeholder="包名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择模板" prop="packageName">
            <el-select v-model="currTemplate" placeholder="请选择" style="margin-right: 20px">
              <el-option
                  v-for="item in templateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <!-- 模板中文件 -->
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
        </el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary">生成代码</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import tableComp from "./components/tableComp.vue";

export default {
  name: "generateCode",
  components: {tableComp},
  data() {
    return {
      activeName: "tableInfo",
      codeForm: {
        sql: "",
      },
      // 表信息激活的tab标签页
      tableActive: "1",
      // 表信息tabs标签页
      tableTabs: [{label: "表一", name: "1"}],
      tableInfoList: [
        {
          tableName: "",
          tableNameCn: "",
          dbEngine: "InnoDb",
          encoded: "utf8",
          fieldList: [
            {
              field: "id",
              type: "BIGINT",
              length: 20,
              isNull: false,
              primaryKey: undefined, // None-否 PRI_AUTO-自增主键 PRI_NO_AUTO-非自增主键,
              defaultValue: "",
              comment: "",
              editing: false,
            },
          ],
        },
      ],
      currentTableInfo: {},
      generateForm: {
        packageName: "", // 包名
        path: "", // 生成路径
        removePre: "", // 去除表名前缀

      },
      // 模板下拉
      templateOptions: [
        {value: '选项1', label: '黄金糕'},
        {value: '选项2', label: '双皮奶'}
      ],
      // 当前选择模板
      currTemplate: "",
      // 模板中包含的文件
      checkAll: false,
      isIndeterminate: true,
      cities: ['entity.java', 'service.java', 'serviceImpl.java', 'controller.java'],
      checkedCities: ['entity.java']
    };
  },
  watch: {
    tableActive: {
      handler(val) {
        const index = this.tableTabs.findIndex((tab) => tab.name === val);
        this.currentTableInfo = this.tableInfoList[index];
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        const tabName = this.tableTabs[this.tableTabs.length - 1].name * 1 + 1;
        this.tableTabs.push({
          label: "新建表",
          name: `${tabName}`,
        });
        const newTableInfo = {
          tableName: "",
          tableNameCn: "",
          dbEngine: "InnoDb",
          encoded: "utf8",
          fieldList: [
            {
              field: "id" + tabName,
              type: "BIGINT",
              length: 20,
              isNull: false,
              primaryKey: undefined, // None-否 PRI_AUTO-自增主键 PRI_NO_AUTO-非自增主键,
              defaultValue: "",
              comment: "",
              editing: false,
            },
          ],
        };
        this.tableInfoList.push(newTableInfo);
      } else if (action === "remove") {
        const tabs = this.tableTabs;
        const removeIndex = tabs.findIndex((tab) => tab.name === targetName);
        let activeTab = this.tableActive;
        // 如果关闭的是当前激活的标签页
        if (activeTab === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              // 寻找下一个被激活的标签，当前标签的后一个标签，没有的话就是前一个标签
              const nextActiveTab = tabs[index + 1] || tabs[index - 1];
              if (nextActiveTab) {
                activeTab = nextActiveTab.name;
              }
            }
          });
        }

        this.tableActive = activeTab;
        this.tableTabs = tabs.filter((tab) => tab.name != targetName);
        this.tableInfoList.splice(removeIndex, 1);
      }
    },
    onTableUpdate(tableInfo) {
      console.log(
          "🐛: ~ file: index.vue:121 ~ onTableUpdate ~ tableInfo:",
          tableInfo
      );
      const index = this.tableTabs.findIndex(
          (tab) => tab.name === this.tableActive
      );
      this.tableInfoList[index] = {...tableInfo};
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }

  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 0 10%;

  .sql-area {
    height: 270px;
    min-height: 250px;
    max-height: 340px;
    overflow: hidden;
  }

  .el-form {
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
