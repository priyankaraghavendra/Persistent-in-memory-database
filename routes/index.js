const express = require('express');
const executeQuery = require('../query_engine');
const { initDB } = require('../utils');

const router = express.Router();

initDB(executeQuery);

/* GET home page. */
router.get('/', (req, res) => {
  // const queryString = 'select name, age from students where name ==
  // "Steve" or name == "John" or gender == "female"';
  const queryString = 'select * from students join employees on students.name = employees.employee_name';
  // const queryString = 'select * from employees';
  const result = executeQuery(queryString);
  res.json(result);
});

router.get('/insert', (req, res) => {
  const queryString = 'insert_into employees values (shahrukh, 25, male), (shashi, 24, male), (kesha, 14, female)';
  // const queryString = 'insert_into employees values (shahrukh, 25, software engineer)';
  const result = executeQuery(queryString);
  res.json(result);
});

router.get('/delete', (req, res) => {
  const queryString = 'delete_from students where name == "shahrukh"';
  const result = executeQuery(queryString);
  res.json(result);
});

router.get('/update', (req, res) => {
  const queryString = 'update students set name = shahrukh, age = 18 where name == "Steve" ';
  const result = executeQuery(queryString);
  res.json(result);
});

router.get('/create_table', (req, res) => {
  // const queryString = 'create_table employees(employee_name, employee_age, employee_position)';
  const queryString = 'create_table students(name, age, gender)';
  const result = executeQuery(queryString);
  res.json(result);
});

// main route to post queries
router.post('/', (req, res) => {
  const { query } = req.body;
  console.log(query);
  const result = executeQuery(query);
  res.json(result);
});

module.exports = router;
