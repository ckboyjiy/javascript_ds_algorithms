import {LinkedList} from "./LinkedList";

export class DoublyLinkedList extends LinkedList {
    constructor(item) {
        super(null);
        this.rear = null;
        if (item) {
            this.add(item);
        }
    }
    _addByIndex(item, index = this.length) {
        const newNode = new Node(item);
        if (this.head !== null) {
            const prevIndex = index ? index - 1 : this.length - 1;
            let prevNode = this.get(prevIndex);
            if (!prevNode) {
                return -1;
            }
            if (prevIndex < this.length - 1) {
                newNode.next = prevNode.next;
                prevNode.next.prev = newNode;
            }
            newNode.prev = prevNode;
            prevNode.next = newNode;
        } else {
            this.head = newNode;
        }

        if (!index || index === this.length) {
            this.rear = newNode;
        }
        ++this.length;
        return index; // 자신의 인덱스를 반환한다.
    }
    remove(index) {
        const currNode = this.get(index);
        currNode.next.prev = currNode.prev;
        currNode.prev.next = currNode.next;
        currNode.next = null;
        currNode.prev = null;
        --this.length;
        return true;
    }
    getLast() {
        return this.rear;
    }
}

export class Node {
    constructor(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}