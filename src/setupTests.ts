let storage: { [key: string]: string } = {};

global.localStorage = {
  getItem: jest.fn().mockImplementation((key: string) => storage[key]),
  setItem: jest.fn().mockImplementation((key: string, value: string) => {
    storage[key] = value;
  }),
  removeItem: jest.fn().mockImplementation((key: string) => {
    delete storage[key];
  }),
  clear: jest.fn().mockImplementation(() => {
    storage = {};
  }),
  key: jest.fn(),
  length: 0,
};
