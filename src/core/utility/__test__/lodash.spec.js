import { given } from 'mocha-testdata';

import { UrlUtil } from '../url';

/**
 * Test the stringToArray method
 *
 * @return {Void}
 */
const testLodashStringToArray = () => {
  context('parse()', () => {
    given({
      input: `a b cd efg h ij,kl`,
      expected: ['a', 'b', 'cd', 'efg', 'h', 'ij,kl']
    },
    {
      input: `a b  cd efg                 h`,
      expected: ['a', 'b', 'cd', 'efg', 'h']
    },
    {
      input: `                   `,
      expected: []
    },
    {
      input: 1234,
      expected: []
    },
    {
      input: ``,
      expected: []
    },
    {
      input: null,
      expected: []
    },
    {
      input: undefined,
      expected: []
    })
    .it('Should stringify correctly', () => {
      // arrange
      const initial = `age=25&name=John&pets=Harry%252C%2520cat%2CAvengers%2CJustice%2520Leagues`;
      const expected = {
        name: "John",
        age: '25',
        pets: ["Harry, cat", "Avengers", "Justice Leagues"]
      };

      // sut
      const result = UrlUtil.parse(initial);

      // expect
      assert.deepEqual(result, expected, "The object must be parsed correctly");
    });
  });
};

// Test the Lodash utility
describe('lodash.spec.js', () => {
  testLodashStringToArray();
});
