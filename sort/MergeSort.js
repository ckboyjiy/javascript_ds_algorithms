import {RandomArray} from "./RandomArray";

export class MergeSort extends RandomArray {
    constructor(number = 0) {
        super(number);
    }
    mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
        let rightArr = new Array(stopRight - startRight + 1);
        let leftArr = new Array(stopLeft - startLeft + 1);
        let k = startRight;
        for(let i = 0; i < (rightArr.length-1);++i) {
            rightArr[i] = arr[k];
            ++k;
        }

        k = startLeft;
        for(let i = 0; i < (leftArr.length-1);++i) {
            leftArr[i] = arr[k];
            ++k;
        }

        rightArr[rightArr.length-1] = Infinity;
        leftArr[leftArr.length-1] = Infinity;
        let m = 0;
        let n = 0;
        for (let a = startLeft; a < stopRight; a++) {
            if (leftArr[m] <= rightArr[n]) {
                arr[a] = leftArr[m];
                m++;
            } else {
                arr[a] = rightArr[n];
                n++;
            }
        }
        //console.log('left array -', leftArr);
        //console.log('right array -', rightArr);
    }
    mergeSort() {
        if (this.dataStore.length < 2) {
            return;
        }
        let step = 1;
        let left, right;
        while(step < this.dataStore.length) {
            left = 0;
            right = step;
            while (right + step <= this.dataStore.length) {
                this.mergeArrays(this.dataStore, left, left + step, right, right + step);
                left = right + step;
                right = left + step;
            }
            if (right < this.dataStore.length) {
                this.mergeArrays(this.dataStore, left, left + step, right, this.dataStore.length);
            }
            step *= 2;
        }
    }
}