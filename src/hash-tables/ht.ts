export class HashTable<T> {
  dataMap: Array<[string?, T?][]>;

  constructor(size = 7) {
    this.dataMap = new Array(size);
  }

  private hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    }
    return hash;
  }

  set(key: string, value: T) {
    const index = this.hash(key);

    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
    }

    this.dataMap[index].push([key, value]);
  }

  get(key: string) {
    const index = this.hash(key);
    if (this.dataMap[index]) {
      for (let i = 0; i < this.dataMap[index]!.length; i++) {
        if (this.dataMap[index][i]![0] === key) {
          return this.dataMap[index][i]![1];
        }
      }
    }
  }

  keys() {
    const allKeys: string[] = [];

    for (let i = 0; i < this.dataMap.length; i++) {
      if (this.dataMap[i]) {
        for (let j = 0; j < this.dataMap[i]!.length; j++) {
          allKeys.push(this.dataMap[i]![j]![0]!);
        }
      }
    }

    return allKeys;
  }
}
