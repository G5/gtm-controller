import RuleParser from './ruleParser';

export default class WhitelistParser {

  private rules: RegExp[];

  constructor(rules: string[]) {
    this.rules = RuleParser.parseRules(rules);
  }

  public matches(str: string) {
    return this.rules.some(rule => str.match(rule) !== null);
  }
}
