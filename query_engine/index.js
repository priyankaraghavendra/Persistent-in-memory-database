/* eslint-disable no-case-declarations */

const executeReadTokens = require('./dml/read');
const executeCreateTokens = require('./dml/create');
const executeUpdateTokens = require('./dml/update');
const executeDeleteTokens = require('./dml/delete');
const executeCreateTableTokens = require('./ddl/create_table');
const {
  tokenize, addQueryToLogFile, ReadError, WriteError, UpdateError, DeleteError, CreateTableError,
} = require('../utils');
const {
  SELECT, INSERT_INTO, UPDATE, DELETE_FROM, CREATE_TABLE,
} = require('../constants');

const executeQuery = (query, initFlag = false) => {
  const tokenMap = tokenize(query);
  const firstToken = Object.keys(tokenMap)[0];
  let result = [];
  let tableName;
  let queryResult;
  // TODO: clean the API signature and find a better way instead of initFlag
  switch (firstToken) {
    case SELECT:
      try {
        result = executeReadTokens(tokenMap);
      } catch (e) {
        throw new ReadError(query, e);
      }
      break;
    case INSERT_INTO:
      try {
        queryResult = executeCreateTokens(tokenMap);
        result = queryResult.data;
        tableName = queryResult.tableName;
        if (!initFlag) {
          addQueryToLogFile(tableName, query);
        }
      } catch (e) {
        throw new WriteError(query, e);
      }
      break;
    case UPDATE:
      try {
        queryResult = executeUpdateTokens(tokenMap);
        result = queryResult.data;
        tableName = queryResult.tableName;
        if (!initFlag) {
          addQueryToLogFile(tableName, query);
        }
      } catch (e) {
        throw new UpdateError(query, e);
      }
      break;
    case DELETE_FROM:
      try {
        queryResult = executeDeleteTokens(tokenMap);
        result = queryResult.data;
        tableName = queryResult.tableName;
        if (!initFlag) {
          addQueryToLogFile(tableName, query);
        }
      } catch (e) {
        throw new DeleteError(query, e);
      }
      break;
    case CREATE_TABLE:
      try {
        result = executeCreateTableTokens(tokenMap);
      } catch (e) {
        throw new CreateTableError(query, e);
      }

      break;
    default: break;
  }
  return result;
};

module.exports = executeQuery;
