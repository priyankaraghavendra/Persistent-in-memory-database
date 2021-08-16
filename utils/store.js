let db = {};

const setDB = (dbObject) => {
  db = dbObject;
};

const getDB = () => db;

const addOrUpdateTableSchema = (tableName, updatedSchema) => {
  if (db[tableName]) {
    db[tableName].schema = updatedSchema;
  } else {
    db = {
      ...db,
      [tableName]: {
        schema: updatedSchema,
        data: [],
      },
    };
  }
};

const addOrUpdateTableData = (tableName, updatedData) => {
  if (db[tableName]) {
    db[tableName].data = updatedData;
  } else {
    db = {
      ...db,
      [tableName]: {
        data: updatedData,
      },
    };
    if (!db[tableName].schema) {
      // TODO: validate default schema creation
      const keys = Object.keys(db[tableName][0]);
      const schema = keys.join(', ');
      addOrUpdateTableSchema(tableName, schema);
    }
  }
};

const getTableData = (tableName) => db[tableName].data;

const getTableSchema = (tableName) => db[tableName].schema;

module.exports = {
  setDB,
  getDB,
  addOrUpdateTableData,
  addOrUpdateTableSchema,
  getTableData,
  getTableSchema,
};
