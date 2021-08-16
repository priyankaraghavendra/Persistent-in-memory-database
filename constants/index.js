const students = require('./demoData');
const KEYWORDS = require('./keywords');

module.exports = {
  students,
  ...KEYWORDS,
};
