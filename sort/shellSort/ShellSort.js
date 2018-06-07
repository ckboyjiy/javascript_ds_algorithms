import {RandomArray} from "../RandomArray";

export class ShellSort extends RandomArray {
    constructor(number = 0) {
        super(number);
        this.gaps = [5, 3, 1];
    }
    shellSort() {
        // console.log(this.toString());
        for (let g = 0; g < this.gaps.length; g++) {
            for (let i = this.gaps[g]; i < this.dataStore.length; i++) {
                let temp = this.dataStore[i];
                let j;
                for (j = i; j >= this.gaps[g] && this.dataStore[j-this.gaps[g]] > temp; j -= this.gaps[g]) {
                    this.dataStore[j] = this.dataStore[j-this.gaps[g]];
                    // console.log(this.toString(), `===> i : ${i}, j : ${j}, temp : ${temp}`);
                }
                this.dataStore[j] = temp;
                // console.log(this.toString(), `===> i : ${i}`);
            }
        }
        // console.log(this.toString());
    }
    dynamicShellSort() {
        let h = 0;
        while (h < this.dataStore.length) {
            h = 3 * h + 1;
        }
        while (h >= 1) {
            for (let i = h; i < this.dataStore.length; i++) {
                for(let j = i; j >= h && this.dataStore[j] > this.dataStore[j-h]; j -= h) {
                    this.swap(j, j-h);
                }
            }
            h = (h-1)/3;
        }
    }
    setGaps(arr) {
        this.gaps = arr;
    }
}