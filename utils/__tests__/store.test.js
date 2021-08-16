/* eslint-disable no-undef */
const {
  setDB, getDB, getTableData, getTableSchema, addOrUpdateTableData, addOrUpdateTableSchema,
} = require('..');
const { students } = require('../../constants');

const schema = Object.keys(students[0]).join(', ');
const updateStudentData = students.map((student) => ({
  name: student.name,
  age: student.age,
}));
const updatedSchema = Object.keys(updateStudentData[0]).join(', ');

describe('Testing DB store functions', () => {
  it('should be empty', () => {
    setDB({});
    expect(getDB()).toEqual({});
  });

  it('should return data and schema for all tables', () => {
    setDB({
      students: {
        data: students,
        schema,
      },
    });
    expect(getDB()).toEqual({
      students: {
        data: students,
        schema,
      },
    });
  });

  it('should return data for a given table', () => {
    expect(getTableData('students')).toEqual(students);
  });

  it('should return schema for a given table', () => {
    expect(getTableSchema('students')).toEqual(schema);
  });

  it('should return updated data for a given table', () => {
    addOrUpdateTableData('students', updateStudentData);
    const result = getTableData('students');
    expect(result).toEqual(updateStudentData);
  });

  it('should return updated schema for a given table', () => {
    addOrUpdateTableSchema('students', updatedSchema);
    const result = getTableSchema('students');
    expect(result).toEqual(updatedSchema);
  });
});
