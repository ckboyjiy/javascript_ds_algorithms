export class Stack {
    constructor() {
        this.dataStore = [];
    }

    /**
     * Stack이 비어있는지 알려준다
     * @returns {boolean}
     */
    empty() {
        if (this.dataStore.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Stack에 객체(item)을 저장한다.
     * @param item
     */
    push(item) {
        this.dataStore.push(item);
    }

    /**
     * Stack의 맨 위에 저장된 객체를 꺼낸다.
     * @returns {*}
     */
    pop() {
        return this.dataStore.pop();
    }

    /**
     * Stack의 맨 위에 저장된 객체를 반환한다.
     * 꺼내지는 않는다.
     * 비었을 때는 null을 반환한다.
     * @returns {*}
     */
    peek() {
        if (this.dataStore.length > 0) {
            return this.dataStore[this.dataStore.length-1];
        } else {
            return null;
        }
    }

    /**
     * Stack에서 주어진 객체(item)을 찾아서 그 위치를 반환한다.
     * @param item
     * @returns {number}
     */
    search(item) {
        return this.dataStore.indexOf(item);
    }

    /**
     * Stack의 현재 길이를 반환한다.
     * @returns {number}
     */
    size() {
        return this.dataStore.length;
    }

    /**
     * Stack의 모든 값을 비운다.
     */
    clear() {
        this.dataStore.splice(0, this.dataStore.length);
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
}