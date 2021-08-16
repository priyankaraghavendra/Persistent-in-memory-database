const isEqual = require('lodash/isEqual');
const {
  UPDATE, WHERE, SET, ASSIGNMENT_OP,
} = require('../../constants');
const { executeWhereClause } = require('../../utils/queryUtils');
const { addOrUpdateTableData, getTableData } = require('../../utils/store');

const executeUpdateTokens = (tokenMap) => {
  let data = [];
  let dataToBeUpdated = [];
  let tableName = '';
  const keywords = [UPDATE, WHERE, SET];
  keywords.forEach((keyword) => {
    if (keyword === UPDATE) {
      tableName = tokenMap[keyword];
      data = getTableData(tableName);
    } else if (keyword === WHERE) {
      const conditionExprString = tokenMap[keyword];
      if (conditionExprString) {
        dataToBeUpdated = executeWhereClause(conditionExprString, data);
      } else {
        dataToBeUpdated = data;
      }
    } else if (keyword === SET) {
      const updates = tokenMap[keyword];
      const updateArr = updates.split(',');
      const updateObj = updateArr.reduce((prevObj, updateVal) => {
        const update = updateVal.trim().split(ASSIGNMENT_OP);
        return {
          ...prevObj,
          [update[0].trim()]: update[1].trim(),
        };
      }, {});
      dataToBeUpdated.forEach((recordToBeUpdated) => {
        data = data.map((val) => {
          let obj = val;
          if (isEqual(val, recordToBeUpdated)) {
            obj = {
              ...obj,
              ...updateObj,
            };
          }
          return obj;
        });
      });
    }
  });
  addOrUpdateTableData(tableName, data);
  return {
    data,
    tableName,
  };
};

module.exports = executeUpdateTokens;
