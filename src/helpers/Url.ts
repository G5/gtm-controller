export default class URL {
  constructor(public url: string) {

  }

  public queryOrHash() {
    const queryIndex = this.url.indexOf('?');
    const hashIndex = this.url.indexOf('#');
    return {
      query: queryIndex > -1,
      queryIndex,
      hash: hashIndex > -1,
      hashIndex
    };
  }

  public hasQueryOrHash(): boolean {
    return this.firstQueryOrHashIndex() > -1;
  }

  public firstQueryOrHashIndex(regex = false) {
    const queryOrHash = this.queryOrHash();
    const { query, hash, hashIndex } = queryOrHash;
    let { queryIndex } = queryOrHash;
    queryIndex -= regex ? 1 : 0;
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
}
