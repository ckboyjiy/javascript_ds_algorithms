import {RandomArray} from "../RandomArray";

export class InsertionSort extends RandomArray {
    constructor(number = 0) {
        super(number);
    }
    insertionSort() {
        let temp, inner;
        // console.log(this.toString() + "\n");
        for(let outer = 1; outer <= this.dataStore.length-1; outer++) {
            temp = this.dataStore[outer];
            inner = outer;
            while(inner > 0 && (this.dataStore[inner-1] >= temp) ) {
                this.dataStore[inner] = this.dataStore[inner-1];
                // console.log(this.toString());
                --inner;
            }
            this.dataStore[inner] = temp;
            // console.log(this.toString() + "\n");
        }
    }
}