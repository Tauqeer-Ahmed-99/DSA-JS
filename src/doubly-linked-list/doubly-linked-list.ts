class Node<T> {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T): DoublyLinkedList<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail) {
        this.tail.next = node;
      }
      node.prev = this.tail;
      this.tail = node;
    }

    this.length++;

    return this;
  }

  pop(): Node<T> | null {
    if (this.length === 0) {
      return null;
    }

    const temp = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (temp) {
        this.tail = temp.prev;
        temp.prev = null;
      }
      if (this.tail) {
        this.tail.next = null;
      }
    }

    this.length--;

    return temp;
  }

  unshift(value: T): DoublyLinkedList<T> {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
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

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      temp.next = null;
    }

    this.length--;

    return temp;
  }

  get(index: number): Node<T> | null {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current: Node<T> | null = this.head;

    if (index < this.length / 2) {
      for (let i = 0; i < index; i++) {
        current = current?.next ?? null;
      }
    } else {
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current?.prev ?? null;
      }
    }

    return current;
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

    const before = this.get(index - 1);

    if (before) {
      const after = before.next;

      before.next = node;
      node.prev = before;
      node.next = after;

      if (after) {
        after.prev = node;
      }

      this.length++;

      return true;
    }

    return false;
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

    const temp = this.get(index);

    if (temp) {
      //   const before = temp.prev;
      //   const after = temp.next;

      //   if (before) before.next = after;
      //   if (after) after.prev = before;

      // OR

      if (temp.prev) temp.prev.next = temp.next;
      if (temp.next) temp.next.prev = temp.prev;

      temp.next = null;
      temp.prev = null;
    }

    this.length--;

    return temp;
  }

  isPalindrome(): boolean {
    if (this.length === 0 || this.length === 1) {
      return true;
    }

    let forward = this.head;
    let backward = this.tail;

    const iterations = this.length / 2;

    for (let i = 0; i < iterations; i++) {
      if (forward?.value !== backward?.value) {
        return false;
      }

      if (forward) forward = forward.next;
      if (backward) backward = backward.prev;
    }

    return true;
  }

  reverse(): DoublyLinkedList<T> {
    let current = this.head;

    while (current) {
      if (current) {
        const temp = current.prev;

        current.prev = current.next;
        current.next = temp;

        current = current.prev;
      }
    }

    const temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    return this;
  }

  partitionList(x: number): DoublyLinkedList<T> {
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
          current.prev = lessTail;
          lessTail = current;
        } else {
          lessHead = current;
          lessTail = current;
        }
      } else {
        if (greaterHead && greaterTail) {
          greaterTail.next = current;
          current.prev = greaterTail;
          greaterTail = current;
        } else {
          greaterHead = current;
          greaterTail = current;
        }
      }

      current = next;
    }

    // These Edge cases are important

    if (lessTail && greaterHead) {
      lessTail.next = greaterHead;
      greaterHead.prev = lessTail;
    }

    this.head = lessHead ? lessHead : greaterHead;
    this.tail = greaterTail ? greaterTail : lessTail;

    return this;
  }

  reverseBetween(start: number, end: number): DoublyLinkedList<T> {
    if (!this.head || start < 0 || end >= this.length || start >= end) {
      return this;
    }

    let prev: Node<T> | null = null;
    let current: Node<T> | null = this.head;

    for (let i = 0; i < start; i++) {
      prev = current;
      if (current) current = current.next;
    }

    const before = prev;
    const sectionStart = current;

    for (let i = start; i <= end; i++) {
      const next = current?.next ?? null;
      if (current) {
        current.next = current.prev;
        current.prev = next;
      }
      prev = current;
      current = next;
    }

    if (before) {
      before.next = prev;
      if (prev) prev.prev = before;
    } else {
      this.head = prev;
    }

    if (sectionStart) {
      sectionStart.next = current;
      if (current) current.prev = sectionStart;
    }

    if (end === this.length - 1) {
      this.tail = sectionStart;
    }

    return this;
  }

  swapPairs(): DoublyLinkedList<T> {
    if (!this.head || !this.head.next) {
      return this;
    }

    let prev: Node<T> | null = null;
    let current: Node<T> | null = this.head;

    // need pairs therefore both current && current.next
    while (current && current.next) {
      const first: Node<T> | null = current;
      const second: Node<T> | null = first.next;

      // Swap
      first.next = second?.next ?? null;
      first.prev = second;
      if (second) {
        second.next = first;
        second.prev = prev;
      }

      //Connect Prev to new pair first

      if (prev) {
        prev.next = second;
      } else {
        this.head = second;
      }

      // prev becomes the last node of the pair
      prev = first;

      current = first.next;
    }

    this.tail = prev;

    return this;
  }
}
