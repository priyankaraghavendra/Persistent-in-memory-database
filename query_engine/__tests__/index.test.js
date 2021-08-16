/* eslint-disable no-undef */
const executeQuery = require('../index');
require('../../constants');

describe('Testing DML query parsers and execution', () => {
  describe('Testing token execution for select query', () => {
    it('should not throw error for empty query', () => {
      const resultSet = executeQuery('');
      expect(resultSet).toEqual([]);
    });

    it('should return data for a few columns', () => {
      const resultSet = executeQuery('select name, age from students');
      expect(resultSet).toEqual([
        { name: 'Steve', age: '29' },
        { name: 'Peter', age: '32' },
        { name: 'Sophie', age: '27' },
        { name: 'Martha', age: '60' },
        { name: 'John', age: '27' },
      ]);
    });

    it('should be able to filter data: case 1', () => {
      const resultSet = executeQuery('select name, age from students where name == "Steve" or gender == "female"');
      expect(resultSet).toEqual([
        { name: 'Steve', age: '29' },
        { name: 'Sophie', age: '27' },
        { name: 'Martha', age: '60' },
      ]);
    });

    it('should be able to filter data: case 2', () => {
      const resultSet = executeQuery('select name, age from students where name == "Steve" and name == "John"');
      expect(resultSet).toEqual([]);
    });

    xit('should be able to filter data: case 3', () => {
      const resultSet = executeQuery('select name, age from students where name == "Steve" and age > "25" or gender == "female"');
      expect(resultSet).toEqual([]);
    });
  });

  describe('Testing token execution for insert query', () => {
    it('should be able to insert a single value', () => {
      const resultSet = executeQuery('insert_into students values (shahrukh, 25, male)');
      expect(resultSet).toEqual([
        { name: 'Steve', age: '29', gender: 'male' },
        { name: 'Peter', age: '32', gender: 'male' },
        { name: 'Sophie', age: '27', gender: 'female' },
        { name: 'Martha', age: '60', gender: 'female' },
        { name: 'John', age: '27', gender: 'male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
      ]);
    });

    it('should be able to insert multiple values', () => {
      const resultSet = executeQuery('insert_into students values (shahrukh, 25, male), (shashi, 24, male), (kesha, 14, female)');
      expect(resultSet).toEqual([
        { name: 'Steve', age: '29', gender: 'male' },
        { name: 'Peter', age: '32', gender: 'male' },
        { name: 'Sophie', age: '27', gender: 'female' },
        { name: 'Martha', age: '60', gender: 'female' },
        { name: 'John', age: '27', gender: 'male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
        { name: 'shashi', age: ' 24', gender: ' male' },
        { name: 'kesha', age: ' 14', gender: ' female' },
      ]);
    });
  });

  describe('Testing token execution for update query', () => {
    it('should be able to update one record', () => {
      const resultSet = executeQuery('update students set name = shahrukh, age = 25 where name == "Steve"');
      expect(resultSet).toEqual([
        { name: 'shahrukh', age: '25', gender: 'male' },
        { name: 'Peter', age: '32', gender: 'male' },
        { name: 'Sophie', age: '27', gender: 'female' },
        { name: 'Martha', age: '60', gender: 'female' },
        { name: 'John', age: '27', gender: 'male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
        { name: 'shashi', age: ' 24', gender: ' male' },
        { name: 'kesha', age: ' 14', gender: ' female' },
      ]);
    });
    it('should be able to update few record', () => {
      const resultSet = executeQuery('update students set age = 25 where age > 25');
      expect(resultSet).toEqual([
        { name: 'shahrukh', age: '25', gender: 'male' },
        { name: 'Peter', age: '25', gender: 'male' },
        { name: 'Sophie', age: '25', gender: 'female' },
        { name: 'Martha', age: '25', gender: 'female' },
        { name: 'John', age: '25', gender: 'male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
        { name: 'shahrukh', age: ' 25', gender: ' male' },
        { name: 'shashi', age: ' 24', gender: ' male' },
        { name: 'kesha', age: ' 14', gender: ' female' },
      ]);
    });
    it('should be able to update all record', () => {
      const resultSet = executeQuery('update students set age = 35, name = John Doe');
      expect(resultSet).toEqual([
        { name: 'John Doe', age: '35', gender: 'male' },
        { name: 'John Doe', age: '35', gender: 'male' },
        { name: 'John Doe', age: '35', gender: 'female' },
        { name: 'John Doe', age: '35', gender: 'female' },
        { name: 'John Doe', age: '35', gender: 'male' },
        { name: 'John Doe', age: '35', gender: ' male' },
        { name: 'John Doe', age: '35', gender: ' male' },
        { name: 'John Doe', age: '35', gender: ' male' },
        { name: 'John Doe', age: '35', gender: ' female' },
      ]);
    });
  });

  describe('Testing token execution for delete query', () => {
    it('should be able to delete one record', () => {
      const resultSet = executeQuery('delete_from students where gender == "female"');
      expect(resultSet).toEqual([
        { name: 'John Doe', age: '35', gender: 'male' },
        { name: 'John Doe', age: '35', gender: 'male' },
        { name: 'John Doe', age: '35', gender: 'male' },
        { name: 'John Doe', age: '35', gender: ' male' },
        { name: 'John Doe', age: '35', gender: ' male' },
        { name: 'John Doe', age: '35', gender: ' male' },
        // TODO: fix the whitespace issues
        { name: 'John Doe', age: '35', gender: ' female' },
      ]);
    });
    it('should be able to delete all records', () => {
      const resultSet = executeQuery('delete_from students');
      expect(resultSet).toEqual([]);
    });
  });
});
