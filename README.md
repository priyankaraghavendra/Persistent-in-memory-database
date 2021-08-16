## Project Overview

* This project models a simple in memory data base that supports basic SQL DDL and DML operations like create table, update tuples, delete tuples and select tuples.<br>
* Created a folder db_store that contains all the files related to the DB thereby modelling a DB's repository<br>
* Note: This database supports only one data type - string.<br>
* This UI of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

| Database action | Query | Sample query |
| :------------: | :-------------: | :-------------: |
| Create a database | create | A database is created when the application is started |
| Create a table | create_table | create_table (tableName); |
| Insert values into a table | insert_into | insert_into students values (shahrukh, 25, male); |
| Select values from a table | read | select name, age from students where name == "Steve" or gender == "female"; |
| Update values to a table | update | update students set name = shahrukh, age = 25 where name == "Steve"; |
| Delete value from a table | delete_from | delete_from students where gender == "female"; |

## Project Schema

<p align="center">
  <img src="https://github.com/js-shashwath/Persistent-in-memory-database/blob/main/DBSchema.jpg" alt="DB schema"/>
</p>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view the database application in your local browser.
Once the UI is visible, you can query the database. Sample query : select name, age from students where name == "Steve" and name == "John"

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Challenging aspects of the project

* The formulation of the following SQL constructs were challenging in the below mentioned aspects :
  * Join : To support any query involving more than one table, an association was required to link the results from table "A" to table "B". This was addressed by implementing the join clause.
  * Grouping : Basically to summarize a table's contents based on a particular attribute the group by clause was implemented.
  * Nested queries : Subqueries are embedded queries inside another query. To offer greater flexibility, subqueries were included as they could be easily broken down into single logical components making up the query.
  * Complex queries using the AND, OR constructs with the WHERE clause : The WHERE clause is analogous to a if condition. This clause is used to compare the given value with the field value available in a table. This construct has been implemented to return a row if the given value from outside is equal to the available field value in the table.
* To improve the performance of looking up a table's record the following technique was used:
  * Indexing the DB : To reduce the lookup time of records, the records of the database were indexed using a hashing function to reduce the lookup time to Log N.  

## Learning outcomes of the project

* Building a query engine : The logic behind constructing the DDL and DML commands supported by the DB and the tokenization of the query string were the learning outcomes of this module.
* Creating a UI : In this module, the UI was bootstrapped using the create native app. We learned how to handle user inputs and pass the query string to the query engine's API.
* Constructing the DB schema by storing the DDL commands in the table schema files : Accessing the file system to store the DB's schema which enabled the recreation of the tables were the learning outcomes here.
