import WhitelistParser from '../../src/helpers/whitelistParser';

describe('Parses whitelist rules into valid regex', () => {
  describe('.matches', () => {
    const rules = [
      'a tamed string',
      'a wild {{string}}',
      '{{startsWithAnything}} but ends with this',
      'some {{something}} goes {{somewhere}} with {{something}}'
    ];
    const whitelist = new WhitelistParser(rules);

    test('Matching strings', () => {
      expect(whitelist.matches('a tamed string')).toBe(true);
      // We decided not to use start/end anchors so this does work
      expect(whitelist.matches('what about a tamed string do we know')).toBe(true);
      expect(whitelist.matches('a wild animal')).toBe(true);
      expect(whitelist.matches('this is how it all starts but ends with this')).toBe(true);
      expect(whitelist.matches('some ketchup goes fantastically with waffles')).toBe(true);
    });

    test('Non-matching strings', () => {
      expect(whitelist.matches('this should not match')).toBe(false);
      expect(whitelist.matches('this is not a wild')).toBe(false);
      expect(whitelist.matches('some goes with')).toBe(false);
    });
  });
});
