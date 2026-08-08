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
}
