import {RandomArray} from "./RandomArray";

export class SelectionSort extends RandomArray {
    constructor(number = 0) {
        super(number);
    }
    selectionSort() {
        // console.log(this.toString());
        for (let outer = 0; outer < this.dataStore.length; outer++) {
            let minIndex = outer;
            for (let inner = outer+1; inner < this.dataStore.length; inner++) {
                if (this.dataStore[inner] < this.dataStore[minIndex]) {
                    minIndex = inner;
                }
            }
            this.swap(outer, minIndex);
            // console.log(this.toString());
        }
    }
}