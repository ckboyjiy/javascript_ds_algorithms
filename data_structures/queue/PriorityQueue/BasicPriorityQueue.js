export class BasicPriorityQueue {
    constructor(isAscending = true) {
        this.first = null;
        this.isAscending = isAscending; // 기본값은 오름차순
    }

    /**
     * 우선순위를 비교한다.
     * is가 then보다 우선순위가 높은지 판단한다.
     * 우선순위는 isAscending값에 따라 오름차순 또는 내림차순으로 결정한다.
     * @param is
     * @param then
     * @returns {boolean}
     */
    isPriority(is, then) {
        if (this.isAscending) { // 오름차순 - is가 then보다 작으면 앞
            return is < then;
        } else {
            return is > then; // 내림차순 - is가 then보다 크면 앞
        }
    }

    isEmpty() {
        return this.first !== null ? false : true;
    }

    enqueue(key, priority) {
        const newNode = new Node(key, priority);
        if (!this.first || this.isPriority(priority, this.first.priority)) {
            // 큐의 값이 비었거나 새로운 노드가 첫 번째 노드보다 우선순위가 높다면 값을 교체한다.
            newNode.next = this.first;
            this.first = newNode;
        } else {
            let pointer = this.first;
            /**
             * 새로운 노드를 뒤에 삽입할 위치(포인터)를 검색한다.
             * 조건 1 : 포인터의 next가 있고(큐의 끝이 아니고)
             * 조건 2 : 포인터의 우선순위가 새로운 노드보다 높다면 반복한다
             */
            while (pointer.next && this.isPriority(pointer.next.priority, priority)) {
                // 포인터를 포인터의 next로 교체한다.
                pointer = pointer.next;
            }
            // 정해진 위치(포인트) 뒤에 새로운 노드를 삽입한다.
            newNode.next = pointer.next;
            pointer.next = newNode;
        }
    }

    /**
     * 가장 앞에 큐를 꺼내고 새로운 first를 지정한다.
     * @returns {null|*}
     */
    dequeue() {
        const first = this.first;
        this.first = this.first.next;
        return first;
    }
}

export class Node {
    constructor(key, priority) {
        this.key = key;
        this.priority = priority;
        this.next = null;
    }
    toString() {
        return {
            key: this.key,
            priority: this.priority,
            next: this.next.key
        }
    }
}
