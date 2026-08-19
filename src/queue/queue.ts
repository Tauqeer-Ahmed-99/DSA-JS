class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class Queue<T> {
  first: Node<T> | null = null;
  last: Node<T> | null = null;
  length: number = 0;

  enqueue(value: T): Queue<T> {
    const node = new Node(value);

    if (!this.first || !this.last) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }

    this.length++;

    return this;
  }

  dequeue(): Node<T> | null {
    if (!this.first) {
      return null;
    }

    const temp = this.first;

    if (this.length === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
      temp.next = null;
    }

    this.length--;

    return temp;
  }
}
