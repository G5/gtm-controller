import escapeRegex from 'lodash.escaperegexp';
import URL from './Url';

export default class RuleParser {
  public static parseRules(whitelistRules: string[]): RegExp[] {
    return whitelistRules.map(rule => {
      // replace escaped placeholders to wildcards
      const wildCharactersMatcher = /\\\{\\\{[^\\\}]*\\}\\}/g;
      const cleansed = escapeRegex(rule).replace(wildCharactersMatcher, '.*');
      return this.optionalTrailingForwardSlash(new URL(cleansed));
    });
  }

  private static optionalTrailingForwardSlash(url: URL): RegExp {
    const queryHashIndex = url.firstQueryOrHashIndex();
    let workingString = url.url;

    if (queryHashIndex > -1) {
      workingString = workingString.substring(0, queryHashIndex);
    }

    const lastChar = workingString.slice(-1);
    if (lastChar === '/') {
      workingString =
        workingString.slice(0, workingString.length) +
        '?' +
        workingString.slice(workingString.length);
    }

    return new RegExp(workingString);
  }
}
