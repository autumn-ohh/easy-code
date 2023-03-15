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
  </div>
</template>

<script>
import tableComp from "./components/tableComp.vue";
export default {
  name: "index",
  components: { tableComp },
  data() {
    return {
      activeName: "tableInfo",
      codeForm: {
        sql: "",
      },
      // 表信息激活的tab标签页
      tableActive: "1",
      // 表信息tabs标签页
      tableTabs: [{ label: "表一", name: "1" }],
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
      this.tableInfoList[index] = { ...tableInfo };
    },
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
