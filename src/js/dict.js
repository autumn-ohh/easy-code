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

// 类型映射
export const defaultTypeMapperData = [
  {
    matchType: "Regex",
    columnType: "varchar(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
  {
    matchType: "Regex",
    columnType: "char(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
  {
    matchType: "Regex",
    columnType: "varchar(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
  {
    matchType: "Regex",
    columnType: "varchar(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
  {
    matchType: "Regex",
    columnType: "varchar(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
  {
    matchType: "Regex",
    columnType: "varchar(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
  {
    matchType: "Regex",
    columnType: "varchar(\\(\\d+\\))?",
    javaType: "java.lang.String",
  },
];

// 匹配模式下拉选项
export const matchTypeOptions = [
  {
    value: "Regex",
    label: "Regex",
  },
  {
    value: "Ordinary",
    label: "Ordinary",
  },
];

// java类型下拉选项
export const javaTypeOptions = [
  {
    value: "java.lang.String",
    label: "java.lang.String",
  },
  {
    value: "java.lang.Integer",
    label: "java.lang.Integer",
  },
  {
    value: "java.lang.Long",
    label: "java.lang.Long",
  },
  {
    value: "java.util.Boolean",
    label: "java.util.Boolean",
  },
  {
    value: "java.util.Date",
    label: "java.util.Date",
  },
  {
    value: "java.time.LocalDateTime",
    label: "java.time.LocalDateTime",
  },
  {
    value: "java.time.LocalDate",
    label: "java.time.LocalDate",
  },
  {
    value: "java.time.LocalTime",
    label: "java.time.LocalTime",
  },
  {
    value: "java.lang.Short",
    label: "java.lang.Short",
  },
  {
    value: "java.lang.Byte",
    label: "java.lang.Byte",
  },
  {
    value: "java.lang.Character",
    label: "java.lang.Character",
  },
  {
    value: "java.math.BigDecimal",
    label: "java.math.BigDecimal",
  },
  {
    value: "java.math.BigInteger",
    label: "java.math.BigInteger",
  },
  {
    value: "java.lang.Double",
    label: "java.lang.Double",
  },
  {
    value: "java.lang.Float",
    label: "java.lang.Float",
  },
  {
    value: "java.lang.String[]",
    label: "java.lang.String[]",
  },
  {
    value: "java.util.List",
    label: "java.util.List",
  },
  {
    value: "java.util.Set",
    label: "java.util.Set",
  },
  {
    value: "java.util.Map",
    label: "java.util.Map",
  },
];
