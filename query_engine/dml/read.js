const {
  FROM, WHERE, SELECT, ORDER_BY_ASC, ORDER_BY_DESC, JOIN, ON, ASSIGNMENT_OP,
} = require('../../constants');
const { executeWhereClause } = require('../../utils/queryUtils');
const { getTableData } = require('../../utils/store');

const executeReadTokens = (tokenMap) => {
  const keywords = [FROM, JOIN, ON, WHERE, SELECT, ORDER_BY_ASC, ORDER_BY_DESC];
  let data = [];
  keywords.forEach((key) => {
    if (tokenMap[key]) {
      if (key === FROM) {
        const tableName = tokenMap[key];
        data = getTableData(tableName);
      } else if (key === JOIN) {
        const tableName = tokenMap[key];
        const joinedTableData = getTableData(tableName);
        const joinedData = [];
        data.forEach((record1) => {
          joinedTableData.forEach((record2) => {
            joinedData.push({
              ...record1,
              ...record2,
            });
          });
        });
        if (joinedData.length > 0) {
          data = joinedData;
        }
      } else if (key === ON) {
        const onClause = tokenMap[key];
        const comparedKeys = onClause.split(ASSIGNMENT_OP);
        const firstKey = comparedKeys[0].split('.')[1].trim();
        const secondKey = comparedKeys[1].split('.')[1].trim();
        data = data.filter((record) => record[firstKey] === record[secondKey]);
      } else if (key === WHERE) {
        const conditionExprString = tokenMap[key];
        data = executeWhereClause(conditionExprString, data);
      } else if (key === SELECT) {
        const selectedColumnsString = tokenMap[key];
        if (selectedColumnsString !== '*') {
          const selectedColumns = selectedColumnsString.split(',');

          data = data.reduce((prev, current) => {
            const filteredObj = {};
            selectedColumns.forEach((selectedColumn) => {
              const trimmedSelectedCol = selectedColumn.trim();
              filteredObj[trimmedSelectedCol] = current[trimmedSelectedCol];
            });
            prev.push(filteredObj);
            return prev;
          }, []);
        }
      } else if (key === ORDER_BY_ASC) {
        const sortedCol = tokenMap[key];
        data.sort((a, b) => {
          if (a[sortedCol].trim() > b[sortedCol].trim()) return -1;
          return 0;
        });
      } else if (key === ORDER_BY_DESC) {
        const sortedCol = tokenMap[key];
        data.sort((a, b) => {
          if (a[sortedCol].trim() < b[sortedCol].trim()) return -1;
          return 0;
        });
      }
    }
  });
  return data;
};

module.exports = executeReadTokens;
