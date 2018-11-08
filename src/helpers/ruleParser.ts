import escapeRegex from 'lodash.escaperegexp';

export default class RuleParser {
  public static parseRules(whitelistRules: string[]): RegExp[] {
    return whitelistRules.map(rule => {
      // replace escaped placeholders to wildcards
      const wildCharactersMatcher = /\\\{\\\{[^\\\}]*\\}\\}/g;
      let cleansed = escapeRegex(rule).replace(wildCharactersMatcher, '.*');
      cleansed = this.optionalTrailingForwardSlash(cleansed);
      return new RegExp(cleansed);
    });
  }

  private static firstQueryOrHashIndex(url: string) {
    const hasQuery = url.indexOf('\\?');
    const hasHash = url.indexOf('#');
    let index = -1;

    // Does it have a query or hash
    if (hasQuery > -1 || hasHash > -1) {
      // Does it have both
      if (hasQuery > -1 && hasHash > -1) {
        // Which occurs first
        index = Math.min(hasQuery, hasHash);
      }
      else {
        // It only has one or the other
        index = hasQuery > -1 ? hasQuery : hasHash;
      }
    }

    return index;
  }

  private static optionalTrailingForwardSlash(url: string) {
    const queryHashIndex = this.firstQueryOrHashIndex(url);
    let workingString = url;

    if (queryHashIndex > -1) {
      workingString = workingString.substring(0, queryHashIndex);
    }

    const lastChar = workingString.slice(-1);
    if (lastChar === '/') {
      url =
        url.slice(0, workingString.length) +
        '?' +
        url.slice(workingString.length);
    }

    return url;
  }
}
