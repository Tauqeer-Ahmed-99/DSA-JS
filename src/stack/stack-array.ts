export class StackArray<T> {
  stackList: Array<T> = [];

  push(value: T) {
    this.stackList.push(value);
  }

  pop(): T | undefined {
    return this.stackList.pop();
  }
}
