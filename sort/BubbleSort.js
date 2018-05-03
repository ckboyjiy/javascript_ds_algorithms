import {RandomArray} from "./RandomArray";

export class BubbleSort extends RandomArray {
    constructor(number = 0) {
        super(number);
    }
    bubbleSort() {
        // console.log(this.toString());
        for(let outer = this.dataStore.length-1; outer >= 1; outer--) {
            for(let inner = 0; inner < outer; inner++) {
                if (this.dataStore[inner] > this.dataStore[inner+1]) {
                    this.swap(inner, inner+1);
                    // console.log(this.toString());
                }
            }
        }
    }
}