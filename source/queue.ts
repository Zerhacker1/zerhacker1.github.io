interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
  empty(): boolean;
}

type QueueObject<T> = {
  value: T;
  previous: QueueObject<T>|null;
  next: QueueObject<T>|null;
}

export class Queue<T> implements IQueue<T> {
  private head: QueueObject<T>|null;
  private tail: QueueObject<T>|null;
  private elements: number;
  
  constructor() {
    this.head = null;
    this.tail = null;
    this.elements = 0;
  }

  enqueue(item: T): void {
    if (this.head === null) {
      this.head = {value: item, next: null, previous: null};
      this.tail = this.head;
    } else {
      this.tail!.next = {value: item, next: null, previous: this.tail};
      this.tail = this.tail!.next;
    }
    ++this.elements;
  }
  dequeue(): T | undefined {
    if (this.head === null) {
      return undefined;
    }
    const headElement = this.head.value;
    this.head = this.head.next;
    if (this.head !== null) {
      this.head.previous = null;
    }
    --this.elements;

    return headElement;
  }
  size(): number {
    return this.elements;
  }
  empty(): boolean {
    return this.size() === 0;
  }
  
}