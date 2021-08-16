const { ALL_KEYWORDS, AND, OR } = require('../constants');

const executeWhereClause = (conditionExprString, data) => {
  const andConditionExprArr = conditionExprString.split(AND);
  const filteredData = data.filter((record) => {
    let andFilterFlag = true;
    andConditionExprArr.forEach((conditionExpr) => {
      const trimmedConditionExpr = conditionExpr.trim();
      const orConditionExprArr = trimmedConditionExpr.split(OR);
      let orFilterFlag = false;
      orConditionExprArr.forEach((orConditionExpr) => {
        const trimmedOrConditionExpr = orConditionExpr.trim();
        const spaceIndex = trimmedOrConditionExpr.indexOf(' ');
        const columnName = trimmedOrConditionExpr.slice(0, spaceIndex);
        const expression = `"${record[columnName]}" ${trimmedOrConditionExpr.slice(spaceIndex)}`;
        // eslint-disable-next-line no-eval
        orFilterFlag = orFilterFlag || eval(expression);
      });
      andFilterFlag = andFilterFlag && orFilterFlag;
    });
    return andFilterFlag;
  });
  return filteredData;
};

const tokenize = (query) => {
  let queryString = query;
  queryString = ALL_KEYWORDS.reduce((prevQuery, keyword) => {
    const index = prevQuery.indexOf(keyword);
    if (index !== -1 && (index === 0 || prevQuery[index - 1] === ' ')) {
      let updatedQuery = '';

      updatedQuery += prevQuery.slice(0, index);
      updatedQuery += '\n';
      updatedQuery += prevQuery.slice(index);
      return updatedQuery;
    }
    return prevQuery;
  }, queryString);
  const tokenStrings = queryString.slice(1).split('\n');
  const tokenMap = tokenStrings.reduce((prevToken, tokenString) => {
    const spaceIndex = tokenString.trim().indexOf(' ');
    if (spaceIndex !== -1) {
      const key = tokenString.slice(0, spaceIndex).trim();
      // eslint-disable-next-line no-param-reassign
      prevToken[key] = tokenString.slice(spaceIndex).trim();
    }
    return prevToken;
  }, {});
  return tokenMap;
};

module.exports = {
  executeWhereClause,
  tokenize,
};
