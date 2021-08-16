/* eslint-disable max-classes-per-file */
class MyDBError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = this.constructor.name;
    this.cause = cause;
  }
}

class ReadError extends MyDBError {}

class WriteError extends MyDBError {}

class UpdateError extends MyDBError {}

class DeleteError extends MyDBError {}

class CreateTableError extends MyDBError {}

module.exports = {
  MyDBError,
  ReadError,
  WriteError,
  UpdateError,
  DeleteError,
  CreateTableError,
};
