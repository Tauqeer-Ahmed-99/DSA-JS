import { Stack } from "../stack/stack.js";

class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class QueueStack<T> {
  top: Node<T> | null = null;
  length = 0;

  enqueue(value: T) {
    const node = new Node(value);

    if (this.length === 0) {
      this.top = node;
    } else {
      const tempStack = new Stack<T>();

      while (this.length > 0) {
        const temp = this.dequeue();
        if (temp) {
          tempStack.push(temp.value);
        }
      }

      this.top = node;

      while (tempStack.length > 0) {
        const temp = tempStack.pop();
        if (temp) {
          this.enqueue(temp.value);
        }
      }
    }

    this.length++;

    return this;
  }

  dequeue(): Node<T> | null {
    if (this.length === 0) {
      return null;
    }

    const temp = this.top;

    this.top = this.top?.next ?? null;
    temp && (temp.next = null);

    return temp;
  }

  print() {
    let temp = this.top;
    for (let i = 0; i < this.length; i++) {
      console.log(temp?.value);
      temp = temp?.next ?? null;
    }
  }
}
