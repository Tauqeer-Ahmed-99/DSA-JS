export class Heap {
  private heap: number[] = [];

  private leftChild(index: number) {
    // Using 0th index of heap
    return 2 * index + 1;
  }

  private rightChild(index: number) {
    // Using 0th index of heap
    return 2 * index + 2;
  }

  private parent(index: number) {
    // Using 0th index of heap
    return Math.floor((index - 1) / 2);
  }

  private swap(index1: number, index2: number) {
    if (index1 < this.heap.length && index2 < this.heap.length) {
      [this.heap[index1], this.heap[index2]] = [
        this.heap[index2]!,
        this.heap[index1]!,
      ];
    }
  }

  private sinkDown(index: number) {
    const size = this.heap.length;
    let maxIndex = index;

    while (true) {
      const leftIndex = this.leftChild(index);
      const rightIndex = this.rightChild(index);

      if (leftIndex < size && this.heap[leftIndex]! > this.heap[maxIndex]!) {
        maxIndex = leftIndex;
      }

      if (rightIndex < size && this.heap[rightIndex]! > this.heap[maxIndex]!) {
        maxIndex = rightIndex;
      }

      if (maxIndex !== index) {
        this.swap(index, maxIndex);
        index = maxIndex;
      } else {
        break;
      }
    }
  }

  insert(value: number) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;

    while (
      currentIndex > 0 &&
      this.heap[currentIndex]! > this.heap[this.parent(currentIndex)]!
    ) {
      this.swap(currentIndex, this.parent(currentIndex));
      currentIndex = this.parent(currentIndex);
    }
  }

  remove(): number | null {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()!;
    }

    const maxValue = this.heap[0]!;
    this.heap[0] = this.heap.pop()!;
    this.sinkDown(0);

    return maxValue;
  }
}
