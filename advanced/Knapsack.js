export class Knapsack {
    constructor(capacity = 0, things = null) {
        this.capacity = capacity; // 배낭의 무게
        this._w = [];
        this._v = [];
        this.initThings(things);
        this.debugArray = [];
    }

    initThings(things) {
        if (things) {
            this._w.length = 0;
            this._v.length = 0;
            things.forEach( val => {
                this._w.push(val.w);
                this._v.push(val.v);
            })
        }
    }
    getThings() {
        return this._w.map( (val, i) => {
            return {w: val, v: this._v[i]};
        })
    }

    recursion(things) {
        if (things) {
            this.initThings(things);
        }
        return this._recursion(this.capacity, this._w.length);
    }

    /**
     *
     * @param capacity : 현재 배낭의 용량
     * @param position : 검사 중인 물건의 인덱스 ( 0, ..., n)
     * @returns {*}
     * @private
     */
    _recursion(capacity, position) {
        if (position <= 0 || capacity <= 0) {
            return 0;
        }
        const w = this._w[position - 1];
        const v = this._v[position - 1];

        if (capacity < w) {
            // 배낭의 용량보다 현재 물건의 무게가 더 크다면 이전 배낭의 용량을 반환
            return this._recursion(capacity, position - 1);
        } else {
            // 배낭의 용량보다 물건의 무게가 작거나 같다면
            // 현재 검사중인 물건의 가치 + 현재 물건의 무게를 뺀 배낭 기준의 최대 가치를 더하거나
            // 현재 물건의 무게를 빼지않은 배낭 기준의 최대 가치 중 더 큰 값을 반환
            return Math.max(
                v + this._recursion(capacity - w, position - 1),
                this._recursion(capacity, position - 1)
            )
        }
    }
    recursionDP(things) {
        if (things) {
            this.initThings(things);
            let arr = [];
            for (let i = 0; i <= this._w.length; i++) {
                arr[i] = [];
            }
            return this._recursionDP(this.capacity, this._w.length, arr);
        } else {
            return 0;
        }
    }

    /**
     *
     * @param capacity : 현재 배낭의 용량
     * @param position : 검사 중인 물건의 인덱스 ( 1, ..., n+1) **** 1부터 시작하여 n+1까지 저장
     * @param arr : 계산된 값을 저장할 이차원배열
     * @returns {*}
     * @private
     */
    _recursionDP(capacity, position, arr) {
        if (position <= 0 || capacity <= 0) {
            if (!arr[position][capacity]) {
                arr[position][capacity] = 0;
            }
            return arr[position][capacity];
        }
        const w = this._w[position - 1];
        const v = this._v[position - 1];

        if (!arr[position][capacity]) {
            if (capacity < w) {
                arr[position][capacity] = this._recursionDP(capacity, position - 1, arr);
            } else {
                arr[position][capacity] = Math.max(
                    v + this._recursionDP(capacity - w, position - 1, arr),
                    this._recursionDP(capacity, position - 1, arr)
                )
            }
        }
        this.debugArray = arr;
        return arr[position][capacity];
    }

    iterDP(things) {
        if (things) {
            this.initThings(things);
            let arr = [];
            for (let i = 0; i <= this.capacity; i++) {
                arr[i] = [];
            }
            return this._iterDP(this.capacity, this._w.length, arr);
        } else {
            return 0;
        }
    }
    _iterDP(capacity, size, arr) {
        let free = capacity;
        // row : 현재 검사중인 물건의 인덱스 + 1
        // col : 가능한 무게량
        // arr[row][col] : 한재 물건까지로 계산된 최대 가치
        for (let row = 0; row <= size; row++) {
            arr[row] = [];
            for (let col = 0; col <= capacity; col++) {
                const weight = this._w[row-1];
                const value = this._v[row-1];
                if (row === 0 || col === 0) {
                    arr[row][col] = 0;
                } else if (weight > col) {
                    arr[row][col] = arr[row-1][col];
                } else {
                    const i = col - weight > 0 ? col - weight : 0;
                    arr[row][col] = Math.max(
                        value + arr[row-1][i],
                        arr[row-1][col]
                    )
                }
            }
        }
        this.debugArray = arr;
        return arr[size][capacity];
    }
}