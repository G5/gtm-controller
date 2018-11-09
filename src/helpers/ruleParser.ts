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

  private static hasQueryOrHash(url: string) {
    const queryIndex = url.indexOf('\\?');
    const hashIndex = url.indexOf('#');
    return {
      query: queryIndex > -1,
      queryIndex,
      hash: hashIndex > -1,
      hashIndex
    };
  }

  private static firstQueryOrHashIndex(url: string) {
    const { query, queryIndex, hash, hashIndex } = this.hasQueryOrHash(url);
    let index = -1;

    if (query || hash) {
      if (query && hash) {
        // Which occurs first
        index = Math.min(queryIndex, hashIndex);
      }
      else {
        // It only has one or the other
        index = query ? queryIndex : hashIndex;
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
