import {RandomArray} from "../RandomArray";

export class BubbleSort extends RandomArray {
    constructor(number = 0) {
        super(number);
    }
    bubbleSort() {
        // 외부 반복문은 배열에서 정렬이 확인되지 않은 배열의 위치를 통제합니다. (배열의 가장 오른쪽 값이 가장 크다고 확인된 인덱스는 제외하는 작업)
        for(let outer = this.dataStore.length-1; outer >= 1; outer--) {
            // 내부 반복문은 배열의 처음부터 정렬 확인이 안된 배열의 위치까지
            for(let inner = 0; inner < outer; inner++) {
                if (this.dataStore[inner] > this.dataStore[inner+1]) { // 인접한 값을 비교하여 왼쪽 값이 오른쪽 값보다 더 크다면
                    this.swap(inner, inner+1); // 두 값을 교환합니다.
                }
            }
        }
    }
}