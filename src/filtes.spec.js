import { checkListening, checkIgnore } from './filters';

const objectExample = {
  listening: 'yahoo',
  ignore: [],
  redirect: {
    to: 'www.google.com',
    concat: false,
  },
};

describe('Test filters.js', () => {
  describe('Test checkListening function', () => {
    it('Should be return undefined for url http://google.com.br', () => {
      const test = checkListening('http://google.com.br', [objectExample]);
      expect(test).toBe(undefined);
    });

    it('Should be return item of array for url http://yahoo.com', () => {
      const test = checkListening('http://yahoo.com', [objectExample]);
      expect(test).toBe(objectExample);
    });
  });

  describe('Test checkIgnore function', () => {
    it(`Should be return true when url doesn't match with any item of ignore array`, () => {
      const test = checkIgnore('http://google.com', ['yahoo']);
      expect(test).toBe(true);
    });

    it(`Should be return false when ur matches with any item of ignore array`, () => {
      const test = checkIgnore('http://google.com', ['yahoo', 'google']);
      expect(test).toBe(false);
    });
  });
});
