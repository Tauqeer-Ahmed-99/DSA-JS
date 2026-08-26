class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  count: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.count = 1;
  }
}

export class BST<T> {
  root: Node<T> | null = null;

  insert(value: T): BST<T> {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return this;
    }

    let temp = this.root;

    while (true) {
      if (temp) {
        if (node.value === temp.value) {
          temp.count += 1;
          return this;
        }

        if (node.value < temp.value) {
          if (temp.left === null) {
            temp.left = node;
            return this;
          }
          temp = temp.left;
        } else {
          if (temp.right === null) {
            temp.right = node;
            return this;
          }
          temp = temp.right;
        }
      }

      return this;
    }
  }

  contains(value: T): boolean {
    if (this.root === null) {
      return false;
    }

    let temp: Node<T> | null = this.root;

    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }

    return false;
  }
}
