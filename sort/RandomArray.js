export class RandomArray {
    constructor(number = 0) {
        this.dataStore = [];
        this.pos = 0;
        this.numElements = number;
        if (this.numElements > 0) {
            for (let i = 0; i < number; i++) {
                this.dataStore[i] = i;
            }
        }
    }
    setData(number) {
        if (number) {
            this.numElements = number;
        }
        for (let i = 0; i < this.numElements; i++) {
            this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
        };
        /*for(let i = 0; i < this.numElements; i++) {
            this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
        }*/
    }
    clear() {
        this.dataStore.length = 0;
    }
    insert(element) {
        this.dataStore[this.dataStore.length] = element;
    }
    swap(index1, index2) {
        let temp = this.dataStore[index1];
        this.dataStore[index1] = this.dataStore[index2];
        this.dataStore[index2] = temp;
    }
    toString() {
        return this.dataStore.reduce((prev, curr) => prev += ', ' + curr);
    }
    getArray() {
        return this.dataStore;
    }
    setArray(arr) {
        this.numElements = arr.length;
        this.dataStore = Array.of(...arr);
    }
}