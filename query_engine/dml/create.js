const { INSERT_INTO, VALUES } = require('../../constants');
const { addOrUpdateTableData, getTableData, getTableSchema } = require('../../utils');

const executeCreateTokens = (tokenMap) => {
  let data = [];
  let tableName = '';
  let values;
  let keys;
  let valObj;
  const keywords = [INSERT_INTO, VALUES];
  keywords.forEach((keyword) => {
    if (!tokenMap[keyword]) {
      return;
    }
    if (keyword === INSERT_INTO) {
      tableName = tokenMap[keyword];
      data = getTableData(tableName);
      // TODO: get the keys from the ddl instead;
      const schema = getTableSchema(tableName);
      keys = schema.split(',');
    } else if (keyword === VALUES) {
      values = tokenMap[keyword];
      const valArr = values.split('(').join('\n(').split('\n').slice(1);
      valArr.forEach((valStr) => {
        const firstIndex = valStr.indexOf('(') + 1;
        const lastIndex = valStr.indexOf(')');
        const slicedValStr = valStr.slice(firstIndex, lastIndex);
        const colDataArr = slicedValStr.split(',');
        valObj = keys.reduce((prevVal, key, index) => ({
          ...prevVal,
          [key.trim()]: colDataArr[index],
        }), {});
        data.push(valObj);
      });
    }
  });
  addOrUpdateTableData(tableName, data);
  return {
    data,
    tableName,
  };
};

module.exports = executeCreateTokens;
