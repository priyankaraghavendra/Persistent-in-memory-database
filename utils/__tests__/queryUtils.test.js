/* eslint-disable no-undef */
const { tokenize, executeWhereClause } = require('..');
const { students } = require('../../constants');

describe('Testing query Utils', () => {
  describe('Testing tokenize function', () => {
    it('should not throw error for empty query', () => {
      const tokens = tokenize('');
      expect(tokens).toEqual({});
    });

    it('should tokenize simple select query', () => {
      const tokens = tokenize('select name, age from students');
      expect(tokens).toEqual(
        {
          from: 'students',
          select: 'name, age',
        },
      );
    });

    it('should tokenize select query with where keyword', () => {
      const tokens = tokenize('select name, age from students where name == "Steve" or gender == "female"');
      expect(tokens).toEqual(
        {
          from: 'students',
          select: 'name, age',
          where: 'name == "Steve" or gender == "female"',
        },
      );
    });

    it('should tokenize insert query', () => {
      const tokens = tokenize('insert_into students values (shahrukh, 25, male), (shashi, 24, male), (kesha, 14, female)');
      expect(tokens).toEqual({
        insert_into: 'students',
        values: '(shahrukh, 25, male), (shashi, 24, male), (kesha, 14, female)',
      });
    });

    it('should tokenize update query', () => {
      const tokens = tokenize('update students set name = shahrukh, age = 18 where name == "Steve"');
      expect(tokens).toEqual({
        update: 'students',
        set: 'name = shahrukh, age = 18',
        where: 'name == "Steve"',
      });
    });

    it('should tokenize delete query', () => {
      const tokens = tokenize('delete_from students where name == "Steve"');
      expect(tokens).toEqual({ delete_from: 'students', where: 'name == "Steve"' });
    });
  });

  describe('Testing executeWhereClause function', () => {
    it('should not throw error for empty parameters', () => {
      const result = executeWhereClause('', []);
      expect(result).toEqual([]);
    });
    it('should be able to filter data for a simple condition', () => {
      const result = executeWhereClause('name == "Steve"', students);
      expect(result).toEqual([{
        name: 'Steve',
        age: '29',
        gender: 'male',
      }]);
    });

    it('should be able to filter data for OR condition', () => {
      const result = executeWhereClause('name == "Steve" or name == "John"', students);
      expect(result).toEqual([{
        name: 'Steve',
        age: '29',
        gender: 'male',
      },
      {
        name: 'John',
        age: '27',
        gender: 'male',
      }]);
    });
    it('should be able to filter data for AND condition', () => {
      const result = executeWhereClause('name == "Steve" and age == "29"', students);
      expect(result).toEqual([{
        name: 'Steve',
        age: '29',
        gender: 'male',
      }]);
    });

    it('should be able to filter data for AND/OR condition. Case 1', () => {
      const result = executeWhereClause('name == "Steve" and age == "29" or gender == "female"', students);
      expect(result).toEqual([{
        name: 'Steve',
        age: '29',
        gender: 'male',
      }]);
    });
    // TODO: current condition execution logic is very basic. Have to improve it.
    it('should be able to filter data for AND/OR condition. Case 2', () => {
      const result = executeWhereClause('gender == "female" or name == "Steve" and age == "29" or gender == "female"', students);
      expect(result).toEqual([{
        name: 'Steve',
        age: '29',
        gender: 'male',
      },
      {
        name: 'Sophie',
        age: '27',
        gender: 'female',
      },
      {
        name: 'Martha',
        age: '60',
        gender: 'female',
      }]);
    });
  });
});
