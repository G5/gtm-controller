import RuleParser from '../../src/helpers/ruleParser';

describe('RuleParser', () => {
  test('Without curly brackets', () => {
    const whitelistRules = ['http://somewebsite.com/contactPage'];
    const parsedRules = RuleParser.parseRules(whitelistRules);
    const expectedRules = [/http:\/\/somewebsite\.com\/contactPage/];
    expect(parsedRules).toEqual(expectedRules);
  });
  describe('Curly brackets turn to wildcards', () => {
    test('Single set of curly brackets', () => {
      const whitelistRules = ['http://somewebsite.com/contactPage/unit-{{unitNumber}}'];
      const parsedRules = RuleParser.parseRules(whitelistRules);
      const expectedRules = [/http:\/\/somewebsite\.com\/contactPage\/unit-.*/];
      expect(parsedRules).toEqual(expectedRules);
    });
    test('Multiple set of curly brackets', () => {
      const whitelistRules = ['{{prefix}}/contactPage/{{locationName}}/unit-{{unitNumber}}'];
      const parsedRules = RuleParser.parseRules(whitelistRules);
      const expectedRules = [/.*\/contactPage\/.*\/unit-.*/];
      expect(parsedRules).toEqual(expectedRules);
    });
  });
  describe('Trailing forward slashes are optional', () => {
    test('URL without query parameters or hash', () => {
      const whitelistRules = ['http://somewebsite.com/contactPage/'];
      const parsedRules = RuleParser.parseRules(whitelistRules);
      const expectedRules = [/http:\/\/somewebsite\.com\/contactPage\/?/];
      expect(parsedRules).toEqual(expectedRules);
    });
    test('URL with query parameters', () => {
      const whitelistRules = ['http://somewebsite.com/contactPage/?unit=123&date=today'];
      const parsedRules = RuleParser.parseRules(whitelistRules);
      const expectedRules = [/http:\/\/somewebsite\.com\/contactPage\/?\?unit=123&date=today/];
      expect(parsedRules).toEqual(expectedRules);
    });
    test('URL with hash', () => {
      const whitelistRules = ['http://somewebsite.com/contactPage/#unit=123&date=today'];
      const parsedRules = RuleParser.parseRules(whitelistRules);
      const expectedRules = [/http:\/\/somewebsite\.com\/contactPage\/?#unit=123&date=today/];
      expect(parsedRules).toEqual(expectedRules);
    });
    test('URL with query parameters and hash', () => {
      const paramHash = '?unit=123&date=today#section=amenities&page=2';
      const whitelistRules = [`http://somewebsite.com/contactPage/${paramHash}`];
      const parsedRules = RuleParser.parseRules(whitelistRules);
      const expectedRules = [new RegExp(`http://somewebsite\\.com/contactPage/?\\${paramHash}`)];
      expect(parsedRules).toEqual(expectedRules);
    });
  });
});
