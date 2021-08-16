const isEqual = require('lodash/isEqual');
const { DELETE_FROM, WHERE } = require('../../constants');
const { executeWhereClause } = require('../../utils/queryUtils');
const { addOrUpdateTableData, getTableData } = require('../../utils/store');

const executeDeleteTokens = (tokenMap) => {
  let data = [];
  let dataToBeDeleted = [];
  let tableName = '';
  const keywords = [DELETE_FROM, WHERE];
  keywords.forEach((keyword) => {
    if (keyword === DELETE_FROM) {
      tableName = tokenMap[keyword];
      data = getTableData(tableName);
    } else if (keyword === WHERE) {
      const conditionExprString = tokenMap[keyword];
      if (conditionExprString) {
        dataToBeDeleted = executeWhereClause(conditionExprString, data);
      } else {
        dataToBeDeleted = data;
      }
    }
  });
  dataToBeDeleted.forEach((valToBeDeleted) => {
    data = data.filter((val) => !isEqual(val, valToBeDeleted));
  });
  addOrUpdateTableData(tableName, data);
  return {
    data,
    tableName,
  };
};

module.exports = executeDeleteTokens;
