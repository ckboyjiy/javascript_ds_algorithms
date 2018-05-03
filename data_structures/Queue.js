export class Queue {
    constructor() {
        this.dataStore = [];
    }

    /**
     * 큐의 끝부분에 요소를 추가한다.
     * @param item
     */
    enqueue(item) {
        this.dataStore.push(item);
    }

    /**
     * 큐의 앞부분의 값을 꺼내서 반환한다.
     * @returns {*}
     */
    dequeue() {
        return this.dataStore.shift();
    }

    /**
     * 큐의 맨 앞의 값을 확인한다.
     * @returns {*}
     */
    front() {
        return this.dataStore[0];
    }

    /**
     * 큐의 맨 뒷 값을 확인한다.
     * @returns {*}
     */
    back() {
        return this.dataStore[this.dataStore.length-1];
    }

    /**
     * 입력받은 구분자값으로 배열을 문자열로 반환한다.
     * 입력값이 없으면 기본적으로 ','로 구분하여 반환한다.
     * @param separator
     * @returns {string}
     */
    toString(separator) {
        return this.dataStore.join(separator ? separator : ',');
    }

    /**
     * 큐가 비었는지 확인한다.
     */
    empty() {
        if (this.dataStore.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    count() {
        return this.dataStore.length;
    }
}