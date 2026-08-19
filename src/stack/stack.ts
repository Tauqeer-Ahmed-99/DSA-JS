class Node<T = unknown> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class Stack<T> {
  top: Node<T> | null = null;
  length: number = 0;

  push(value: T): Stack<T> {
    const node = new Node(value);

    if (!this.top) {
      this.top = node;
    } else {
      node.next = this.top;
      this.top = node;
    }

    this.length++;

    return this;
  }

  pop(): Node<T> | null {
    if (!this.top) {
      return null;
    }

    const temp = this.top;
    this.top = this.top.next;
    temp.next = null;
    this.length--;

    return temp;
  }
}
