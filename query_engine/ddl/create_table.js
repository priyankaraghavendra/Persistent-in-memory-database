const { addOrUpdateTableSchema, createTableFiles } = require('../../utils');
const { CREATE_TABLE } = require('../../constants');

const executeCreateTableTokens = (tokenMap) => {
  const keywords = [CREATE_TABLE];
  keywords.forEach((keyword) => {
    const tokenString = tokenMap[keyword];
    if (!tokenString) {
      return;
    }
    if (keyword === CREATE_TABLE) {
      const bracketIndex = tokenString.indexOf('(');
      const tableName = tokenString.slice(0, bracketIndex);
      const columnString = tokenString.slice(bracketIndex + 1, tokenString.length - 1).trim();
      // const columnsArr = columnString.split(',');
      try {
        createTableFiles(tableName, columnString);
      } catch (e) {
        console.log(e);
      }

      addOrUpdateTableSchema(tableName, columnString);
    }
  });
};

module.exports = executeCreateTableTokens;
