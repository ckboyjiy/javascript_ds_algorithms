import {RandomArray} from "../sort/RandomArray";

export class LinearSearch extends RandomArray {
    constructor(number = 0) {
        super(number);
    }

    /**
     * 선형 검색
     * @param val
     * @param isSelfOrganized : 자체정렬 사용 여부
     * @returns {number}
     */
    search(val, isSelfOrganized) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] === val) {
                let resultIndex = i;
                if (isSelfOrganized && i > 0) {
                    let dd = Math.floor(this.dataStore.length * 0.2);
                    if (i > (this.dataStore.length * 0.2)) {
                        this.swap(i, Math.floor(this.dataStore.length * 0.2));
                        resultIndex = Math.floor(this.dataStore.length * 0.2);
                    } else {
                        this.swap(i, i-1);
                        resultIndex = i-1;
                    }
                }
                return resultIndex;
            }
        }
        return -1;
    }
    searchMinValue() {
        let min = this.dataStore[0];
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] < min) {
                min = this.dataStore[i];
            }
        }
        return min;
    }
    searchMaxValue() {
        let max = this.dataStore[0];
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] > max) {
                max = this.dataStore[i];
            }
        }
        return max;
    }
}