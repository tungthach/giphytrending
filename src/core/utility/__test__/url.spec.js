import { given } from 'mocha-testdata';

import { UrlUtil } from '../url';

/**
 * Test the 'stringify' method
 *
 * @return {Void}
 */
const testStringify = () => {
  context('stringify()', () => {
    given({
      initial: {
        name: "John",
        age: 25,
        pets: ["Harry, cat", "Avengers", "Justice Leagues"]
      },
      expected: `age=25&name=John&pets=Harry%252C%2520cat%2CAvengers%2CJustice%2520Leagues`
    },
    {
      initial: {
        name: "John",
        age: null,
        pets: []
      },
      expected: `name=John`
    },
    {
      initial: {},
      expected: ``
    })
    .it('Should stringify correctly', ({initial, expected}) => {
      // sut
      const result = UrlUtil.stringify(initial);

      // expect
      assert.equal(result, expected, "The object must be stringified correctly");
    });

    given({
      name: "John",
      age: 25,
      habits: {
        pets: ["Avengers", "Justice Leagues"]
      }
    },
    ["Avengers", "Justice Leagues"],
    'This is a string'
    )
    .it('Should throw error on invalid object', (initial) => {
      // sut
      const execution = () => UrlUtil.stringify(initial);

      // expect
      assert.throws(execution);
    });
  });
};

/**
 * Test the 'parse' method
 *
 * @return {Void}
 */
const testParse = () => {
  context('parse()', () => {
    given({
      initial: `age=25&name=John&pets=Harry%252C%2520cat%2CAvengers%2CJustice%2520Leagues`,
      expected: {
        name: "John",
        age: 25,
        pets: ["Harry, cat", "Avengers", "Justice Leagues"]
      }
    },
    {
      initial: '',
      expected: {}
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

// Test the Url utility class
describe('url.spec.js', () => {
  testStringify();
  testParse();
});
