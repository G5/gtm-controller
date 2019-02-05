import escapeRegex from 'lodash.escaperegexp';
import URL from "../../src/helpers/Url";

describe('URL', () => {
  const expectations = [
    {
      test: 'URL with no hash or query',
      url: 'http://somewebsite.com/contactPage',
      queryOrHash: {
        query: false,
        queryIndex: -1,
        hash: false,
        hashIndex: -1
      },
      winningIndex: -1
    },
    {
      test: 'URL with hash',
      url: 'http://somewebsite.com/contactPage/#unit=123&date=today',
      queryOrHash: {
        query: false,
        queryIndex: -1,
        hash: true,
        hashIndex: 35
      },
      winningIndex: 35
    },
    {
      test: 'URL with query parameter',
      url: 'http://somewebsite.com/contactPage/?unit=123&date=today',
      queryOrHash: {
        query: true,
        queryIndex: 35,
        hash: false,
        hashIndex: -1
      },
      winningIndex: 35
    },
    {
      test: 'URL with hash and query parameter',
      url: 'http://somewebsite.com/contactPage/?unit=123&date=today#section=amenities&page=2',
      queryOrHash: {
        query: true,
        queryIndex: 35,
        hash: true,
        hashIndex: 55
      },
      winningIndex: 35
    }
  ];

  describe('All expectations of URL permutations are correct', () => {
    expectations.forEach(expectation => {
      const url = new URL(expectation.url);
      describe(expectation.test, () => {
        test('No query or hash', () => {
          expect(url.queryOrHash()).toEqual(expectation.queryOrHash);
        });
        test('Has query or hash', () => {
          const { query, hash } = expectation.queryOrHash;
          expect(url.hasQueryOrHash()).toEqual(query || hash);
        });
        test('Query or hash index', () => {
          expect(url.firstQueryOrHashIndex()).toEqual(expectation.winningIndex);
        });
      });
    });
  });

  describe('URL in regex form', () => {
    const regexUrl = escapeRegex('http://somewebsite.com/contactPage/?unit=123&date=today');
    const url = new URL(regexUrl);
    test('Finds correct first query offset index', () => {
      expect(url.firstQueryOrHashIndex(true)).toEqual(36);
    });
  });
});
