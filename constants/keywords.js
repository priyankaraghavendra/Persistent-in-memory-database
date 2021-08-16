const FROM = 'from';
const WHERE = 'where';
const SELECT = 'select';
const INSERT_INTO = 'insert_into';
const VALUES = 'values';
const UPDATE = 'update';
const SET = 'set';
const DELETE_FROM = 'delete_from';
const USE = 'use';
const CREATE_TABLE = 'create_table';
const AND = 'and';
const OR = 'or';
const JOIN = 'join';
const ON = 'on';
const ASSIGNMENT_OP = '=';
const ORDER_BY_ASC = 'order_by_asc';
const ORDER_BY_DESC = 'order_by_desc';

const ALL_DML_KEYWORDS = [
  FROM,
  WHERE,
  SELECT,
  ORDER_BY_ASC,
  ORDER_BY_DESC,
  INSERT_INTO,
  VALUES,
  UPDATE,
  SET,
  DELETE_FROM,
  USE,
  CREATE_TABLE,
  JOIN,
  ON,
];

const ALL_DDL_KEYWORDS = [
  USE,
  CREATE_TABLE,
];

// AND, ASSIGNMENT_OP and OR are not a part of ALL_KEYWORDS
const ALL_KEYWORDS = [
  ...ALL_DDL_KEYWORDS,
  ...ALL_DML_KEYWORDS,
];

module.exports = {
  ALL_KEYWORDS,
  ALL_DML_KEYWORDS,
  ALL_DDL_KEYWORDS,
  FROM,
  WHERE,
  SELECT,
  INSERT_INTO,
  VALUES,
  UPDATE,
  SET,
  DELETE_FROM,
  USE,
  CREATE_TABLE,
  AND,
  OR,
  ASSIGNMENT_OP,
  ORDER_BY_ASC,
  ORDER_BY_DESC,
  JOIN,
  ON,
};
