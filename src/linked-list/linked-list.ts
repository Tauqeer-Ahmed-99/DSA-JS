class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.next = null;
    this.value = value;
  }
}

export default class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T): LinkedList<T> {
    const node = new Node(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;

    return this;
  }

  pop(): Node<T> | null {
    if (!this.head) return null;

    let temp = this.head;
    let prev = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      while (temp.next) {
        prev = temp;
        temp = temp.next;
      }

      this.tail = prev;
      this.tail.next = null;
    }

    this.length--;

    return temp;
  }

  unshift(value: T): LinkedList<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;

    return this;
  }

  shift(): Node<T> | null {
    if (!this.head) {
      return null;
    }

    const temp = this.head;
    this.head = this.head.next;
    temp.next = null;

    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return temp;
  }

  get(index: number): Node<T> | null {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let temp = this.head;

    for (let i = 0; i < index; i++) {
      temp = temp ? temp.next : null;
    }

    return temp;
  }

  set(index: number, value: T): boolean {
    const node = this.get(index);

    if (node) {
      node.value = value;
      return true;
    }

    return false;
  }

  insert(index: number, value: T): boolean {
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === 0) {
      this.unshift(value);
      return true;
    }

    if (index === this.length) {
      this.push(value);
      return true;
    }

    const node = new Node(value);

    const temp = this.get(index - 1);

    if (temp) {
      node.next = temp.next;
      temp.next = node;
    }

    this.length++;

    return true;
  }

  remove(index: number): Node<T> | null {
    if (index < 0 || index > this.length) {
      return null;
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const temp = this.get(index - 1);

    if (temp) {
      temp.next = temp.next ? temp.next.next : null;
      temp.next = null;
    }

    this.length--;

    return temp;
  }

  reverse(): LinkedList<T> {
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    let next = temp ? temp.next : null;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = temp ? temp.next : null;
      if (temp) {
        temp.next = prev;
      }
      prev = temp;
      temp = next;
    }

    return this;
  }

  findMiddleNode(): Node<T> | null {
    let slow = this.head;
    let fast = this.head;

    if (!this.head) {
      return null;
    }

    while (fast?.next) {
      fast = fast?.next?.next ?? null;
      slow = slow?.next ?? null;
    }

    return slow;
  }

  hasLoop(): boolean {
    let slow = this.head;
    let fast = this.head;

    if (!this.head) {
      return false;
    }

    while (fast?.next) {
      fast = fast?.next?.next ?? null;
      slow = slow?.next ?? null;
      if (fast === slow) {
        return true;
      }
    }

    return false;
  }

  findKthFromEnd(k: number) {
    let slow = this.head;
    let fast = this.head;

    if (!this.head || k <= 0 || k > this.length) {
      return null;
    }

    // Move fast k nodes ahead
    for (let i = 0; i < k; i++) {
      fast = fast?.next ?? null;
    }

    // Move both pointers until fast reaches the end
    while (fast) {
      slow = slow?.next ?? null;
      fast = fast.next;
    }

    return slow;
  }

  removeDuplicates() {
    const uniqueValues = new Set<T>();

    let current = this.head;
    let prev: Node<T> | null = null;

    while (current) {
      if (uniqueValues.has(current.value)) {
        if (prev) {
          prev.next = current.next;
        }
        this.length--;
      } else {
        uniqueValues.add(current.value);
        prev = current;
      }
      current = current.next;
    }

    return this;
  }

  binaryToDecimal(): number {
    let decimal = 0;

    let current = this.head;

    while (current) {
      decimal = decimal * 2 + (current.value as number);
      current = current.next;
    }

    return decimal;
  }

  partitionList(x: number): LinkedList<T> {
    let lessHead: Node<T> | null = null;
    let lessTail: Node<T> | null = null;
    let greaterHead: Node<T> | null = null;
    let greaterTail: Node<T> | null = null;

    let current = this.head;

    while (current) {
      const next = current.next;

      current.next = null;

      if ((current.value as number) < x) {
        if (lessHead && lessTail) {
          lessTail.next = current;
          lessTail = current;
        } else {
          lessHead = current;
          lessTail = current;
        }
      } else {
        if (greaterHead && greaterTail) {
          greaterTail.next = current;
          greaterTail = current;
        } else {
          greaterHead = current;
          greaterTail = current;
        }
      }
      current = next;
    }

    if (lessTail) {
      lessTail.next = greaterHead;
    }

    this.head = lessHead;
    this.tail = greaterTail;

    return this;
  }

  reverseBetween(start: number, end: number): LinkedList<T> {
    if (!this.head || start < 0 || end >= this.length || start >= end) {
      return this;
    }

    let current: Node<T> | null = this.head;
    let prev: Node<T> | null = null;

    // Move to the start of the section
    for (let i = 0; i < start; i++) {
      prev = current;
      current = current?.next ?? null;
    }

    // prev = node before start section
    // current = start of the section

    const before = prev;
    const startSection = current;

    // Reverse the section between start and end
    for (let i = start; i <= end; i++) {
      const next = current?.next ?? null;

      if (current) {
        current.next = prev;
      }

      prev = current;
      current = next;
    }

    // connect the head
    if (before) {
      before.next = prev;
    } else {
      this.head = prev;
    }

    if (startSection) {
      startSection.next = current;
    }

    // Update the tail if necessary
    if (end === this.length - 1) {
      this.tail = startSection;
    }

    return this;
  }

  swapPairs(): LinkedList<T> {
    if (!this.head || !this.head.next) {
      return this;
    }

    let prev: Node<T> | null = null;
    let current: Node<T> | null = this.head;

    while (current && current.next) {
      const first: Node<T> | null = current;
      const second: Node<T> | null = first.next;

      // Swap
      first.next = second?.next ?? null;
      if (second) second.next = first;

      // Connect Prev pair to the current pair
      if (prev) {
        prev.next = second;
      } else {
        this.head = second;
      }

      // prev becomes the last node of the pair
      prev = first;

      // move the next pair

      current = first.next;
    }

    this.tail = prev;

    return this;
  }

  log() {
    let temp = this.head;
    console.log("head", this.head);
    console.log("tail", this.tail);
    while (temp?.next) {
      console.log("value", temp.value);
      console.log("next", temp.next);

      temp = temp.next;
    }
  }
}
