import {expect} from 'chai';
import {InsertionSort} from "./InsertionSort";

describe('Insertion class test', ()=> {
    it('should be sort array', () => {
        let arr = new InsertionSort();
        arr.setData(10);
        arr.insertionSort();

    })
})