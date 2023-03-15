// 数据库类型字典
export const fieldTypeOps = [
  {
    label: "数值类型",
    options: [
      "TINEINT",
      "SMALLINT",
      "MEDIUMINT",
      "INT",
      "BIGINT",
      "FLOAT",
      "DOUBLE",
      "DECIMAL",
    ],
  },
  {
    label: "字符串类型",
    options: [
      "CHAR",
      "VARCHAR",
      "TINYBLOB",
      "TINYTEXT",
      "BLOB",
      "TEXT",
      "MEDIUMBLOB",
      "MEDIUMTEXT",
      "LONGBLOB",
      "LONGTEXT",
    ],
  },
  {
    label: "日期和时间类型",
    options: ["DATE", "TIME", "YEAR", "DATETIME", "TIMESTAMP"],
  },
];

// 数据库类型与数据库类型长度、Java类型映射表
export const typeMapping = {
  // 数值类型
  TINEINT: {
    length: 3,
    javaType: "Integer",
  },
  SMALLINT: {
    length: 5,
    javaType: "Integer",
  },
  MEDIUMINT: {
    length: 8,
    javaType: "Integer",
  },
  INT: {
    length: 11,
    javaType: "Integer",
  },
  BIGINT: {
    length: 20,
    javaType: "Long",
  },
  FLOAT: {
    length: undefined,
    javaType: "Float",
  },
  DOUBLE: {
    length: undefined,
    javaType: "Double",
  },
  DECIMAL: {
    length: "10,0",
    javaType: "String",
  },
  // 字符串类型
  CHAR: {
    length: 1,
    javaType: "String",
  },
  VARCHAR: {
    length: 32,
    javaType: "String",
  },
  TINYBLOB: {
    length: undefined,
    javaType: "String",
  },
  TINYTEXT: {
    length: undefined,
    javaType: "String",
  },
  BLOB: {
    length: undefined,
    javaType: "String",
  },
  TEXT: {
    length: undefined,
    javaType: "String",
  },
  MEDIUMBLOB: {
    length: undefined,
    javaType: "String",
  },
  MEDIUMTEXT: {
    length: undefined,
    javaType: "String",
  },
  LONGBLOB: {
    length: undefined,
    javaType: "String",
  },
  LONGTEXT: {
    length: undefined,
    javaType: "String",
  },
  // 时间和日期类型
  DATE: {
    length: undefined,
    javaType: "Date",
  },
  TIME: {
    length: undefined,
    javaType: "Date",
  },
  YEAR: {
    length: undefined,
    javaType: "Date",
  },
  DATETIME: {
    length: undefined,
    javaType: "Date",
  },
  TIMESTAMP: {
    length: undefined,
    javaType: "Date",
  },
};

// 主键类型字典
export const primaryKeyOps = {
  None: {
    label: "否",
    sql: undefined,
  },
  PRI_AUTO: {
    label: "自增主键",
    sql: "AUTO_INCREMENT",
  },
  PRI_NO_AUTO: {
    label: "非自增主键",
    sql: undefined,
  },
};
