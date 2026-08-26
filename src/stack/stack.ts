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

  sort() {
    const self = this as Stack<number>;

    let temp: Node<number> | null;

    const stack = new Stack<number>();

    while (self.length > 0) {
      temp = self.pop() as Node<number>;
      if (temp) {
        if (stack.length === 0) {
          stack.push(temp.value);
        } else {
          if (stack.top) {
            if (temp.value > stack.top.value) {
              stack.push(temp.value);
            } else {
              self.push(stack.pop()!.value);
            }
          }
        }
      }

      return self;
    }
  }

  peek(): T | null {
    return this.top?.value ?? null;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  print() {
    let temp = this.top;
    for (let i = 0; i < this.length; i++) {
      console.log(temp?.value);
      temp = temp?.next ?? null;
    }
  }
}

export function reverseString(str: string) {
  const stack = new Stack<string>();

  for (let i = 0; i < str.length; i++) {
    stack.push(str.charAt(i));
  }

  let reversed = "";

  while (stack.length > 0) {
    reversed = reversed + stack.pop()?.value;
  }

  return reversed;
}

export function isBalancedParentheses(parentheses: string) {
  const stack = new Stack<string>();

  for (let i = 0; i < parentheses.length; i++) {
    const p = parentheses.charAt(i);
    if (p === "(") {
      stack.push(p);
    } else if (p === ")") {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}

export function sortStack(stack: Stack<number>) {
  const additionalStack = new Stack<number>();

  while (!stack.isEmpty()) {
    const temp = stack.pop();

    const peekVal = additionalStack.peek();

    while (
      !additionalStack.isEmpty() &&
      peekVal &&
      temp &&
      peekVal > temp.value
    ) {
      stack.push(additionalStack.pop()!.value);
    }

    additionalStack.push(temp!.value);
  }

  while (!additionalStack.isEmpty()) {
    stack.push(additionalStack.pop()!.value);
  }

  return stack;
}
