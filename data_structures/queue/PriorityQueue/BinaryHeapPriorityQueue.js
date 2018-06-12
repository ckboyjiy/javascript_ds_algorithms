export class BinaryHeapPriorityQueue {
    constructor(isAscending = true) {
        this.heap = [null];
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
        return this.heap.length > 1 ? false : true;
    }

    heapifyUp() {
        const lastIndex = this.heap.length - 1;                         // 배열의 마지막 인덱스
        let lastParentNodeIndex = Math.floor(lastIndex / 2);            // 자식을 가지고 있는 마지막 인덱스
        while (lastParentNodeIndex > 0) {
            this.heapify(lastParentNodeIndex);
            lastParentNodeIndex--;
        }
    }

    heapify(i) {
        const parentNode = this.heap[i];                              // 부모 노드
        const leftNode = this.heap[i * 2];                            // 왼쪽 자식 노드
        const rightNode = this.heap[i * 2 + 1];                       // 오른쪽 자식 노드
        if (rightNode && this.isPriority(rightNode.priority, leftNode.priority)) {
            /**
             * 오른쪽 자식이 존재하면 왼쪽 자식과 오른쪽 자식 중 우선순위가 높은 노드를
             * 부모 노드와 우선순위를 비교하여 교체여부를 판단
             */
            if (this.isPriority(rightNode.priority, parentNode.priority)) {
                this.swap(i, i * 2 + 1);
                this.heapify(i * 2 + 1);
            }
        } else if(leftNode) {
            /**
             * 오른쪽 자식이 없거나, 왼쪽 자식이 우선순위가 높으면
             * 부모 노드와 왼쪽 노드를 비교하여 교체여부를 판단
             * (현재 탐색중인 노드는 무조건 자식이 있으므로 왼쪽 노드는 반드시 존재함)
             */
            if (this.isPriority(leftNode.priority, parentNode.priority)) {
                this.swap(i, i * 2);
                this.heapify(i * 2);
            }
        }
    }

    swap(a, b) {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }

    enqueue(key, priority) {
        const newNode = new Node(key, priority);
        this.heap.push(newNode);
        this.heapifyUp();
    }

    /**
     * 가장 앞에 큐를 꺼내고 새로운 first를 지정한다.
     * @returns {null|*}
     */
    dequeue() {
        if (this.heap.length > 2) {
            // heap 배열의 1번 인덱스와 마지막 인덱스를 교체
            this.swap(1, this.heap.length - 1);
            const result = this.heap.pop();
            this.heapify(1);
            return result;
        } else {
            return this.heap.pop();
        }
    }

    setPriority(key, priority) {
        const target = this.heap.filter(node => node !== null && node.key === key);
        target.forEach(node => {
            node.priority = priority;
        });
        this.heapifyUp();
    }

    getByKey(key) {
        return this.heap.find(node => node !== null && node.key === key);
    }
}

export class Node {
    constructor(key, priority) {
        this.key = key;
        this.priority = priority;
    }
    toString() {
        return {
            key: this.key,
            priority: this.priority,
            next: this.next.key
        }
    }
}
