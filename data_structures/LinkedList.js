export class LinkedList {
    constructor(item) {
        this.head = null;
        this.length = 0;
        if (item) {
            this.add(item);
        }
    }
    add(item, index = this.length) {
        if (typeof index === 'number') {
            return this._addByIndex(item, index);
        } else if (typeof index === 'string') {
            // TODO.
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
            }
            prevNode.next = newNode;
        } else {
            this.head = newNode;
        }
        ++this.length;
        return index; // 자신의 인덱스를 반환한다.
    }
    get(index) {
        let currNode;
        if (index >= 0) {
            currNode = this.head;
            for (let i = 1; i <= index; i++) {
                currNode = currNode.next;
            }
        }
        return currNode;
    }
    getFirst() {
        return this.head;
    }
    remove(index) {
        const prevNode = this.get(index - 1);
        if (prevNode) {
            prevNode.next = prevNode.next.next;
        }
        --this.length;
        return true;
    }
    indexOf(item) {
        let currNode = this.head;
        let index = 0;
        while (currNode.element !== item) {
            currNode = currNode.next;
            ++index;
        }
        return index;
    }
    size() {
        return this.length;
    }
    find(item) {
        let currNode = this.head;
        while (currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    toString() {
        let result = '';
        let currNode = this.head;
        while(currNode !== null) {
            result += currNode.element;
            if (currNode.next != null) {
                result += ', ';
            }
            currNode = currNode.next;
        }
        return result;
    }
}

export class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}