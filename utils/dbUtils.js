/* eslint-disable no-console */
const fs = require('fs');
const { addOrUpdateTableSchema, addOrUpdateTableData } = require('./store');
// const executeQuery = require('../query_engine/index');

const ROOT_DIR = '../db_store';
// initializes the database schema and data in the store variable
// TODO: get the logs and create the data for the table
const initDB = (executeQuery) => {
  if (!fs.existsSync(ROOT_DIR)) {
    fs.mkdirSync(ROOT_DIR);
  }
  const tables = fs.readdirSync(ROOT_DIR);
  tables.forEach((tableName) => {
    // const logs = fs.readFileSync(`../db_store/${table}/log.txt`, 'utf-8');

    const schema = fs.readFileSync(`${ROOT_DIR}/${tableName}/schema.txt`, 'utf-8');
    const logs = fs.readFileSync(`${ROOT_DIR}/${tableName}/log.txt`, 'utf-8');
    addOrUpdateTableSchema(tableName, schema);
    addOrUpdateTableData(tableName, []);
    const logArr = logs.split('\n');
    let data = [];
    logArr.forEach((log) => {
      const trimmedLogString = log.trim();
      if (trimmedLogString === '') {
        return;
      }
      data = executeQuery(log, true);
      console.log(data);
    });
  });
};

const createTableFiles = (tableName, columnString) => {
  const dir = `${ROOT_DIR}/${tableName}`;
  if (fs.existsSync(dir)) {
    throw new Error('Table already exists');
  } else {
    fs.mkdirSync(dir);
    fs.writeFileSync(`${dir}/log.txt`, '', (err) => {
      if (err) throw err;
      console.log('log file created');
    });
    fs.writeFileSync(`${dir}/schema.txt`, columnString, (err) => {
      if (err) throw err;
      console.log('schema file created');
    });
  }
};

const addQueryToLogFile = (tableName, query) => {
  try {
    fs.appendFileSync(`${ROOT_DIR}/${tableName}/log.txt`, `${query}\n`);
  } catch (e) {
    console.log('Error writing to log file ', e);
  }
};

module.exports = {
  initDB,
  createTableFiles,
  addQueryToLogFile,
};
