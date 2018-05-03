import {RandomArray} from "./RandomArray";

export class QuickSort extends RandomArray {
    constructor(number = 0) {
        super(number);
    }

    /**
     *
     * @param low : 탐색할 가장 최소 인덱스
     * @param high : 탐색할 가장 최대 인덱스
     */
    quickSort(low = 0, high = this.dataStore.length-1) {
        if (low < high) { // 당연히 최대인덱스는 최소 인덱스보다 커야 된다..
            const pivotIndex = this.partition(low, high);

            this.quickSort(low, pivotIndex - 1);
            this.quickSort(pivotIndex + 1, high);
        }
    }
    partition(low, high) {
        const pivot = this.dataStore[high]; // 배열의 가장 오른쪽(끝) 값이 기준값으로 정한다.
        let i = low - 1; // 피벗값보다 작은 값들로 이뤄진 배열의 마지막 인덱스값
        for (let j = low; j < high; j++) {
            //현재 j인덱스의 값이 pivot보다 작거나 같다면
            if (this.dataStore[j] <= pivot) {
                i++;
                if (i !== j) {
                    const temp = this.dataStore[i];
                    this.dataStore[i] = this.dataStore[j];
                    this.dataStore[j] = temp;
                }
            }
        }
        if (i+1 !== high) {
            const temp = this.dataStore[i+1];
            this.dataStore[i+1] = this.dataStore[high];
            this.dataStore[high] = temp;
        }
        return i+1;
    }
}