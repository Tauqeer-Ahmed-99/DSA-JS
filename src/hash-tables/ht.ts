export class HashTable<T> {
  private dataMap: Array<[string?, T?][]>;
  size: number = 0;

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

    for (let i = 0; i < this.dataMap[index].length; i++) {
      if (this.dataMap[index]![i]![0] === key) {
        this.dataMap[index]![i]![1] = value;
        return;
      }
    }

    this.dataMap[index].push([key, value]);
    this.size++;
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

  delete(key: string): boolean {
    const index = this.hash(key);
    if (this.dataMap[index]) {
      const oldLength = this.dataMap[index].length;
      this.dataMap[index] = this.dataMap[index].filter(([k]) => k !== key);
      const newLength = this.dataMap[index].length;
      const removed = newLength === oldLength - 1;
      if (removed) {
        this.size--;
      }
      return removed;
    }

    return false;
  }
}

export const itemsInCommon = <T>(arr1: T[], arr2: T[]): boolean => {
  const ht = new HashTable<boolean>();

  for (const item of arr1) {
    ht.set(item as string, true);
  }

  for (const item of arr2) {
    if (ht.get(item as string)) {
      return true;
    }
  }

  return false;
};

export const findDuplicates = <T>(arr: T[]) => {
  const ht = new HashTable<boolean>();

  const duplicates: T[] = [];

  for (const item of arr) {
    const key = item as string;
    const itemPresent = ht.get(key);

    if (itemPresent) {
      duplicates.push(item);
    } else {
      ht.set(key, true);
    }
  }

  return duplicates;
};

export const firstNonRepeatingChar = (str: string) => {
  const ht = new HashTable<number>();

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const charCount = ht.get(char);

    ht.set(char, charCount ? charCount + 1 : 1);
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const charCount = ht.get(char);
    if (charCount === 1) {
      return char;
    }
  }

  return null;
};

export const groupAnagrams = (arr: string[]) => {
  const ht = new HashTable<string[]>();

  for (const str of arr) {
    const key = str.toString().split("").sort().join();
    const existing = ht.get(key);
    if (existing) {
      existing.push(str);
    } else {
      ht.set(key, [str]);
    }
  }

  const keys = ht.keys();

  const groupedAnagrams: string[][] = [];

  for (const key of keys) {
    groupedAnagrams.push(ht.get(key)!);
  }

  return groupedAnagrams;
};

export const twoSum = (arr: number[], target: number) => {
  const ht = new HashTable<number>();

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]!;
    const complement = target - num;

    if (ht.get(complement.toString()) != null) {
      return [ht.get(complement.toString())!, i];
    }

    ht.set(num.toString(), i);
  }

  return [];
};

// export const subarraySum = (arr: number[], target: number) => {
//   let start = 0;
//   let end = 0;

//   let sum = 0;

//   let i = 0;
//   while (start < arr.length) {
//     const num = arr[i]!;
//     sum += num;

//     if (sum < target) {
//       end = i;
//       i++;
//     } else if (sum > target) {
//       start++;
//       end = start;
//       i = start;
//       sum = 0;
//     } else if (sum === target) {
//       end = i;
//       return [start, end];
//     } else {
//       break;
//     }
//   }

//   return [];
// };

export const subarraySum = (arr: number[], target: number) => {
  const ht = new HashTable<number>();
  let sum = 0;

  ht.set("0", -1);

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]!;
    sum += num;

    if (ht.get(`${sum - target}`) != null) {
      return [ht.get(`${sum - target}`)! + 1, i];
    } else {
      ht.set(`${sum}`, i);
    }
  }

  return [];
};

export const removeDuplicates = (arr: number[]): number[] => {
  const ht = new HashTable<boolean>();

  const unique: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]!;
    if (!ht.get(`${num}`)) {
      unique.push(num);
      ht.set(`${num}`, true);
    }
  }

  return unique;
};

export const hasUniqueChars = (str: string): boolean => {
  const ht = new HashTable<boolean>();

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (ht.get(char)) {
      return false;
    } else {
      ht.set(char, true);
    }
  }

  return true;
};

export const findPairs = (arr1: number[], arr2: number[], target: number) => {
  const ht = new HashTable<true>();

  for (const num of arr1) {
    if (!ht.get(`${num}`)) {
      ht.set(`${num}`, true);
    }
  }

  const pairs: number[][] = [];

  for (const num of arr2) {
    const complement = target - num;

    if (ht.get(`${complement}`)) {
      pairs.push([complement, num]);
    }
  }

  return pairs;
};

export const longestConsecutiveSequence = (arr: number[]): number => {
  const ht = new HashTable<true>();

  for (const num of arr) {
    if (!ht.get(`${num}`)) {
      ht.set(`${num}`, true);
    }
  }

  let longestStreak = 0;

  for (const key of ht.keys()) {
    const num = Number(key);

    if (!ht.get(`${num - 1}`)) {
      let currentNum = num;
      let currentStreak = 1;

      while (ht.get(`${currentNum + 1}`)) {
        currentNum++;
        currentStreak++;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
};
