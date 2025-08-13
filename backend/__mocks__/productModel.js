import { jest } from '@jest/globals';

const find = jest.fn();
const findById = jest.fn();
const findByIdAndDelete = jest.fn();
const save = jest.fn();

class ProductModelMock {
  save() {
    return save();
  }
}

export default {
  find,
  findById,
  findByIdAndDelete,
  prototype: ProductModelMock.prototype,
  __saveMock: save,
};
