export class DoublySimpleLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    find(index) {
        if (typeof index === 'number') {
            let currIndex = 0;
            if (index < 0 || index > this.length) {
                return null;
            }
            let target = this.head;
            while (currIndex !== index) {
                target = target.next;
                currIndex++;
            }
            return target;
        }
    }
    add(data, index) {
        let prevNode = this.head;
        let newNode = new Node(data);
        if (index !== null && index !== undefined) {
            prevNode = this.find(index);
            if (prevNode !== null) {
                let nextNode = prevNode.next;
                newNode.next = nextNode;
                nextNode.prev = newNode; // 다음 노드의 prev에 추가될 노드를 지정합니다.
                prevNode.next = newNode;
                newNode.prev = prevNode; // 추가될 노드의 prev에 이전 노드를 지정합니다.
                this.length++;
            }
        } else {
            if (prevNode) {
                while (prevNode.next) {
                    prevNode = prevNode.next;
                }
                prevNode.next = newNode;
                newNode.prev = prevNode; // 추가될 노드의 prev에 이전 노드를 지정합니다.
            } else {
                this.head = newNode;
            }
            this.length++;
        }
    }
    remove(index) {
        let currNode = this.find(index);
        if (currNode) {
            if (currNode.prev) {
                currNode.prev.next = currNode.next;
            }
            if (currNode.next) {
                currNode.next.prev = currNode.prev;
            }
            if (index === 0) { // 첫번째 노드를 삭제한다면 head값을 재 지정합니다.
                this.head = currNode.next;
            }
            currNode.next = null;
            currNode.prev = null;
            this.length--;
        }
    }
}

export class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null; // 이전 노드 링크
    }
}