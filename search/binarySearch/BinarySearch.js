import {RandomArray} from "../../sort/RandomArray";
import {QuickSort} from "../../sort/quickSort/QuickSort";

export class BinarySearch extends QuickSort {
    constructor(number = 0) {
        super(number);
    }
    search(val) {
        let upperBound = this.dataStore.length - 1;
        let lowerBound = 0;
        while (lowerBound <= upperBound) {
            const mid = Math.floor((upperBound + lowerBound) / 2);
            if (this.dataStore[mid] < val) {
                lowerBound = mid + 1;
            } else if (this.dataStore[mid] > val) {
                upperBound = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
    count(val) {
        let count = 0;
        const position = this.search(val);
        if (position > -1) {
            ++count;
            for (let i = position-1; i > 0; i--) {
                if (this.dataStore[i] === val) {
                    ++count;
                } else {
                    break;
                }
            }
            for (let i = position+1; i < this.dataStore.length; i++) {
                if (this.dataStore[i] === val) {
                    ++count;
                } else {
                    break;
                }
            }
        }
        return count;
    }
}