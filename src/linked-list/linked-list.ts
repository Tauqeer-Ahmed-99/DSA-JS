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
